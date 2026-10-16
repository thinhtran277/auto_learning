# Playwright POM

Template kiểm thử end-to-end với Playwright Test, TypeScript và Page Object Model.

## Cấu trúc

```text
pages/       Page Object: locator và thao tác trên từng trang
fixtures/    Khởi tạo/chia sẻ Page Object cho test
tests/       Test case, assertion và luồng nghiệp vụ
```

## Cài đặt và chạy

```bash
npm install
npx playwright install chromium
npm test
```

Chạy test có giao diện hoặc mở báo cáo:

```bash
npm run test:headed
npm run test:ui
npm run report
```

## Thêm test theo POM

1. Tạo class trong `pages/` và nhận `Page` qua constructor.
2. Đăng ký Page Object trong `fixtures/test.fixture.ts` bằng `base.extend`.
3. Import `test` và `expect` từ fixture trong file test ở `tests/`.

Test mẫu mở trang chủ Playwright, click **Get started**, rồi xác nhận trang tài liệu đã tải.
