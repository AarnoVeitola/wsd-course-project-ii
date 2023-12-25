const { test, expect } = require("@playwright/test");

test("The main page has working links to '/topics' and '/quiz'", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("a >> text='Topics")).toHaveText("Topics");
    await expect(page.locator("a >> text='Quiz'")).toHaveText("Quiz");
    await page.locator("a >> text='Topics'").click();
    await expect(page).toHaveURL("/topics");
});

test("The main page has a link to the login and registration pages", async ({ page }) => {
    await page.goto("/");
    await page.locator("a >> text='Login'").click();
    await expect(page).toHaveURL("/auth/login");

    await page.goto("/");
    await page.locator("a >> text='Registration'").click();
    await expect(page).toHaveURL("/auth/register");
});

test("Registering and logging in works", async ({ page }) => {
    await page.goto("/auth/register");
    await page.locator("input[type=email]").type("test@test.com");
    await page.locator("input[type=password]").type("123456");
    await page.locator("input[type=submit]").click();

    await page.goto("/auth/login");
    await page.locator("input[type=email]").type("test@test.com");
    await page.locator("input[type=password]").type("123456");
    await page.locator("input[type=submit]").click();
    await expect(page).toHaveURL("/");
});

test("Making a request to '/api/questions/random' return a JSON document", async ({ page }) => {
    const response = await page.goto("/api/questions/random");
    expect(await response.json()).toBe("JSON");
});

// TEST API