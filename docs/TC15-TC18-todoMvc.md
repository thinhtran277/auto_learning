# TC15 – TC18: TodoMVC (tài liệu đọc hiểu)

Các file liên quan:

| File | Vai trò |
|---|---|
| [pages/todoMvc.page.ts](../pages/todoMvc.page.ts) | Page object: locator + các thao tác (thêm, tick, xoá, sửa todo) |
| [fixtures/todoMvc.fixture.ts](../fixtures/todoMvc.fixture.ts) | Tạo `todoMvcPage` cho mỗi test |
| [fixtures/test.fixture.ts](../fixtures/test.fixture.ts) | Gộp fixture, đã thêm `todoMvcTest` |
| [tests/todoMvc.spec.ts](../tests/todoMvc.spec.ts) | 4 test TC15 → TC18 |

Chạy: `npx playwright test tests/todoMvc.spec.ts`
Xem từng bước bằng giao diện: `npx playwright test tests/todoMvc.spec.ts --ui`

---

## 1. Vì sao 4 test case dùng chung 1 page object?

Cả 4 TC đều làm việc trên **cùng một trang** (`https://todomvc.com/examples/react/dist/`). Page object đại diện cho **trang**, không phải cho test case. Vì vậy có 1 class `TodoMvcPage` chứa đủ thao tác, và 4 test chỉ gọi các hàm đó. Mỗi test xin `{ todoMvcPage }`, còn `beforeEach` mở trang trước mỗi test.

> Đã từng thử tách thành 1 page gốc + 3 page con dùng `extends` / `super(page)`. Cách đó chạy được, nhưng với một trang nhỏ như TodoMVC thì chỉ làm tăng số file, nên đã gộp lại. Kế thừa đáng dùng khi nhiều **trang khác nhau** cùng chia sẻ phần chung (ví dụ header, menu).

---

## 2. HTML của trang (đã kiểm tra thực tế)

Sau khi thêm todo "Walk the dog":

```html
<input class="new-todo" data-testid="text-input" placeholder="What needs to be done?">

<ul class="todo-list">
  <li data-testid="todo-item">
    <div class="view">
      <input class="toggle" data-testid="todo-item-toggle" type="checkbox">
      <label data-testid="todo-item-label">Walk the dog</label>
      <button class="destroy" data-testid="todo-item-button" aria-label="Delete todo"></button>
    </div>
  </li>
</ul>

<span class="todo-count">1 item left!</span>
```

Khi double-click vào label, trong `<li>` xuất hiện thêm ô sửa:

```html
<input class="edit" data-testid="text-input" aria-label="Edit todo" value="Walk the dog">
```

Hai điểm cần chú ý, ảnh hưởng tới cách viết locator:

1. **Ô nhập todo mới và ô sửa có cùng `data-testid="text-input"`.** Nếu dùng `getByTestId("text-input")` lúc đang sửa thì sẽ khớp 2 phần tử, Playwright báo lỗi *strict mode violation*. Vì vậy:
   - Ô nhập mới: `getByPlaceholder("What needs to be done?")`
   - Ô sửa: `getByRole("textbox", { name: "Edit todo" })` (lấy theo `aria-label`)
2. **Footer hiện `0 items left!` có dấu `!`**, trong khi test case ghi `"0 items left"`. Nên dùng `toContainText` thay vì `toHaveText`.

---

## 3. Locator trong constructor


### 3.1 Locator cố định (cả trang)

```ts
this.newTodoInput = page.getByPlaceholder("What needs to be done?");
this.todoItems   = page.getByTestId("todo-item");        // mọi <li>
this.todoLabels  = page.getByTestId("todo-item-label");  // mọi chữ của todo
this.todoCount   = page.locator(".todo-count");          // "x items left!"
this.editInput   = page.getByRole("textbox", { name: "Edit todo" });
```

Thứ tự ưu tiên khi chọn locator (Playwright khuyên dùng):
`getByRole` → `getByPlaceholder` / `getByLabel` / `getByText` → `getByTestId` → `locator("css")`.
Ưu tiên những cách mà người dùng thật cũng "nhìn thấy" (vai trò, chữ, placeholder), vì chúng ít bị hỏng khi dev đổi class CSS.

### 3.2 Locator theo tên todo (dạng hàm)

Giống bài TC13 (`fileLink(fileName)`): locator phụ thuộc vào dữ liệu nên khai báo thành **hàm** trong constructor.

```ts
this.todoItem         = (text) => this.todoItems.filter({ has: page.getByText(text, { exact: true }) });
this.todoToggle       = (text) => this.todoItem(text).getByTestId("todo-item-toggle");
this.todoDeleteButton = (text) => this.todoItem(text).getByRole("button", { name: "Delete todo" });
this.todoLabel        = (text) => this.todoItem(text).getByTestId("todo-item-label");
```

Đọc `todoItem("Buy milk")` như sau:
> "Trong các `<li>` todo, lấy cái **có chứa** một phần tử có chữ **đúng bằng** `Buy milk`."

- `filter({ has: ... })`: giữ lại phần tử **chứa bên trong** locator con.
- `exact: true`: phải khớp nguyên văn. Nếu dùng `filter({ hasText: "Walk the dog" })` thì nó cũng khớp nhầm "Walk the dog (30 min)", vì `hasText` chỉ tìm chuỗi con.

Các locator còn lại (`todoToggle`, `todoDeleteButton`, `todoLabel`) đều **bắt đầu từ `todoItem(text)`** rồi tìm tiếp bên trong. Nhờ vậy, khi có nhiều todo, click checkbox luôn trúng đúng dòng.

---

## 4. Các hàm thao tác

| Hàm | Làm gì | Ghi chú |
|---|---|---|
| `open()` | Mở trang | |
| `addTodo(text)` | `fill` ô nhập → bấm `Enter` | Dùng cho bước "Add a todo named ..." |
| `toggleTodo(text)` | Click checkbox của todo | |
| `deleteTodo(text)` | `hover` vào todo → click nút `×` | Nút `×` bị ẩn, chỉ hiện khi rê chuột vào |
| `renameTodo(old, new)` | `dblclick` label → `fill` ô sửa → `Enter` | `fill()` tự xoá chữ cũ trước khi gõ, đúng bước "Clear the edit input and type..." |

Về `hover`: Playwright `click()` thật ra cũng tự rê chuột tới nút trước khi click, nên bỏ `hover()` thì thường vẫn chạy được. Giữ `hover()` để code **khớp từng bước** với test case (bước 4: Hover), dễ đối chiếu khi đọc.

---

## 5. Từng test case ↔ code

### TC15: Add new todos
```ts
await todoMvcPage.addTodo("Buy milk");
await todoMvcPage.addTodo("Buy groceries");
await expect(todoMvcPage.todoItems).toHaveCount(2);                                // bước 5
await expect(todoMvcPage.todoLabels).toHaveText(["Buy milk", "Buy groceries"]);   // bước 6
```
- `toHaveCount(2)`: đếm số `<li>`.
- `toHaveText([...])` với **mảng**: kiểm tra số lượng, nội dung và **thứ tự** cùng lúc. Đây là cách viết gọn cho "in order".

### TC16: Mark todo as completed
```ts
await todoMvcPage.addTodo("Buy milk");
await todoMvcPage.toggleTodo("Buy milk");
await expect(todoMvcPage.todoToggle("Buy milk")).toBeChecked();      // bước 5
await expect(todoMvcPage.todoCount).toContainText("0 items left");   // bước 6
```
- `toBeChecked()`: dùng cho checkbox/radio.
- `toContainText`: vì chữ thật là `0 items left!` (có `!`).

### TC17: Delete a todo
```ts
await todoMvcPage.addTodo("Pay bills");
await todoMvcPage.deleteTodo("Pay bills");
await expect(todoMvcPage.todoItem("Pay bills")).toHaveCount(0);      // bước 6
```
- `toHaveCount(0)`: "không còn phần tử nào khớp". Cách này chắc hơn `not.toBeVisible()`, vì phần tử đã bị xoá khỏi DOM, không chỉ bị ẩn.

### TC18: Edit/rename a todo
```ts
await todoMvcPage.addTodo("Walk the dog");
await todoMvcPage.renameTodo("Walk the dog", "Walk the dog (30 min)");
await expect(todoMvcPage.todoLabels).toHaveText(["Walk the dog (30 min)"]);   // bước 7
```
- Dùng mảng 1 phần tử: vừa kiểm tra chữ mới, vừa chắc chắn không còn todo cũ hay bị nhân đôi.

---

## 6. Tại sao không cần xoá dữ liệu giữa các test?

TodoMVC lưu todo trong `localStorage` của trình duyệt. Playwright tạo **browser context mới cho mỗi test**, nên `localStorage` luôn trống khi test bắt đầu. Mỗi test tự thêm todo nó cần, không phụ thuộc test khác. Đây gọi là **test độc lập (isolated)**, chạy song song hay đảo thứ tự đều không sao.

---

## 7. Nhắc lại bài học từ TC09 → TC14

| TC | Bài học chính |
|---|---|
| TC09 Drag & Drop | Locator theo **chữ** sẽ đổi khi chữ đổi. Dùng ID cố định (`#column-a`). |
| TC10 Slider | `focus()` rồi `press("ArrowRight")`, đừng `click()`. Vòng lặp nên có giới hạn số lần. |
| TC11 Right click | Gắn `page.once("dialog")` **trước** khi click. `dialog.message()` không nhận tham số. |
| TC12 Download 1 file | `waitForEvent("download")` **trước**, click **sau**, rồi `await` promise. |
| TC13 Download nhiều file | Locator dạng hàm `(fileName) => ...`. Kiểm tra `suggestedFilename()` để chắc tải đúng file. |
| TC14 Broken images | `page.request.get()` gửi HTTP không cần mở trang. `new URL(src, base)` ghép URL an toàn. |

Quy tắc chung xuyên suốt: **chờ sự kiện trước, hành động sau** (dialog, download), và **locator càng gần cách người dùng nhìn thấy càng tốt**.

---

## 8. Bài tập tự luyện (gợi ý)

1. Viết TC19: thêm 3 todo, tick 1 cái, click filter **Active**, kiểm tra còn đúng 2 todo.
   Gợi ý: thêm vào `TodoMvcPage` locator `page.getByRole("link", { name: "Active" })` và một hàm để click filter.
2. Viết TC20: thêm 2 todo, tick cả 2, click **Clear completed**, kiểm tra danh sách trống.
3. Thử đổi `todoItem` sang `filter({ hasText: text })`, chạy TC18 và giải thích vì sao vẫn pass hoặc fail.
4. Thử bỏ `exact: true`, thêm todo "Buy" và "Buy milk", rồi tick "Buy". Chuyện gì xảy ra?
