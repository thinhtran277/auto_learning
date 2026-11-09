# TC15 – TC18: TodoMVC (tài liệu đọc hiểu)

Các file liên quan:

| File | Vai trò |
|---|---|
| [pages/todoMvc.page.ts](../pages/todoMvc.page.ts) | Page **gốc**: mở trang, thêm todo, tìm todo (TC15 dùng) |
| [pages/todoMvcComplete.page.ts](../pages/todoMvcComplete.page.ts) | Kế thừa page gốc + tick todo, đếm "items left" (TC16) |
| [pages/todoMvcDelete.page.ts](../pages/todoMvcDelete.page.ts) | Kế thừa page gốc + xoá todo (TC17) |
| [pages/todoMvcEdit.page.ts](../pages/todoMvcEdit.page.ts) | Kế thừa page gốc + sửa todo (TC18) |
| [fixtures/todoMvc.fixture.ts](../fixtures/todoMvc.fixture.ts) | Tạo 4 fixture: `todoMvcPage`, `todoMvcCompletePage`, `todoMvcDeletePage`, `todoMvcEditPage` |
| [fixtures/test.fixture.ts](../fixtures/test.fixture.ts) | Gộp fixture, đã thêm `todoMvcTest` |
| [tests/todoMvc.spec.ts](../tests/todoMvc.spec.ts) | 4 test TC15 → TC18 |

Chạy: `npx playwright test tests/todoMvc.spec.ts`
Xem từng bước bằng giao diện: `npx playwright test tests/todoMvc.spec.ts --ui`

---

## 1. Vì sao tách thành 1 page gốc + 3 page con (kế thừa)?

Cả 4 TC làm việc trên **cùng một trang**, và test nào cũng cần `open()` + `addTodo()` + `todoItem(text)`. Nếu tách thành 4 file độc lập thì 3 thứ đó bị chép lại 4 lần. Nên dùng **kế thừa (`extends`)**:

```
TodoMvcPage (gốc)          open(), addTodo(), todoItems, todoLabels, todoItem(text)
 ├─ TodoMvcCompletePage    + todoToggle(text), todoCount, toggleTodo()
 ├─ TodoMvcDeletePage      + todoDeleteButton(text), deleteTodo()
 └─ TodoMvcEditPage        + editInput, todoLabel(text), renameTodo()
```

Page con có **tất cả** những gì page gốc có, cộng thêm phần riêng. Ví dụ `todoMvcDeletePage.addTodo(...)` vẫn gọi được dù file `todoMvcDelete.page.ts` không viết hàm `addTodo`, vì nó được thừa hưởng từ `TodoMvcPage`.

Trong constructor của page con, dòng đầu tiên luôn là `super(page)`:

```ts
export class TodoMvcDeletePage extends TodoMvcPage {
  constructor(page: Page) {
    super(page);   // chạy constructor của TodoMvcPage trước → this.todoItem có sẵn
    this.todoDeleteButton = (text) => this.todoItem(text).getByRole("button", { name: "Delete todo" });
  }
}
```

`super(page)` = "chạy constructor của class cha". Phải gọi trước khi dùng `this`, nếu không TypeScript báo lỗi. Nhờ vậy `this.todoItem` đã được tạo sẵn để page con dùng tiếp.

Vì 4 page cùng thuộc 1 trang, chúng dùng chung **1 file fixture** (`todoMvc.fixture.ts`) khai báo 4 fixture. Mỗi test chỉ xin đúng page nó cần, ví dụ TC17 dùng `async ({ todoMvcDeletePage }) => ...`. Vì mỗi test dùng page khác nhau nên `open()` được gọi ở đầu từng test, còn `beforeEach` chỉ giữ `test.slow()`.

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

> Ở mục này, code được gom lại để dễ đọc. Trong thực tế mỗi locator nằm ở page tương ứng (xem bảng ở mục 1).

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
   Gợi ý: tạo `TodoMvcFilterPage extends TodoMvcPage`, locator `page.getByRole("link", { name: "Active" })`. Cần tick todo thì có thể extends `TodoMvcCompletePage` thay vì page gốc.
2. Viết TC20: thêm 2 todo, tick cả 2, click **Clear completed**, kiểm tra danh sách trống.
3. Thử đổi `todoItem` sang `filter({ hasText: text })`, chạy TC18 và giải thích vì sao vẫn pass hoặc fail.
4. Thử bỏ `exact: true`, thêm todo "Buy" và "Buy milk", rồi tick "Buy". Chuyện gì xảy ra?
