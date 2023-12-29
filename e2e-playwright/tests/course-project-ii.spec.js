const { test, expect } = require("@playwright/test");

test("The main page has working links to '/topics' and '/quiz'", async ({ page }) => {
    await page.goto("/auth/login");
    await page.locator("input[type=email]").type("admin@admin.com");
    await page.locator("input[type=password]").type("123456");
    await page.locator("input[type=submit]").click();

    await page.goto("/");
    await expect(page.locator("a >> text='Topics'")).toHaveText("Topics");
    await page.locator("a >> text='Topics'").click();
    await expect(page).toHaveURL("/topics");

    await page.goto("/");
    await expect(page.locator("a >> text='Quiz'")).toHaveText("Quiz");
    await page.locator("a >> text='Quiz'").click();
    await expect(page).toHaveURL("/quiz");
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
    await expect(page).toHaveURL("/topics");
});

test("Path '/topics' requires authentication", async ({ page }) => {
    await page.goto("/topics");
    await expect(page).toHaveURL("/auth/login");

    await page.goto("/auth/login");
    await page.locator("input[type=email]").type("admin@admin.com");
    await page.locator("input[type=password]").type("123456");
    await page.locator("input[type=submit]").click();

    await page.goto("/topics");
    await expect(page).toHaveURL("/topics");
});

test("Path '/quiz' requires authentication", async ({ page }) => {
    await page.goto("/quiz");
    await expect(page).toHaveURL("/auth/login");

    await page.goto("/auth/login");
    await page.locator("input[type=email]").type("admin@admin.com");
    await page.locator("input[type=password]").type("123456");
    await page.locator("input[type=submit]").click();

    await page.goto("/quiz");
    await expect(page).toHaveURL("/quiz");
});

test("The JSON document received when making a request to '/api/questions/random' has the attributes 'answerOptions', 'questionId' and 'questionText'", async ({ page }) => {
    await page.goto("/auth/login");
    await page.locator("input[type=email]").type("admin@admin.com");
    await page.locator("input[type=password]").type("123456");
    await page.locator("input[type=submit]").click();

    await page.goto("/topics/1");
    await page.locator("textarea").type("Question 1");
    await page.locator("input[type=submit]").click();
    const response = await page.goto("/api/questions/random");
    const text = await response.json();
    expect(text.answerOptions).toBeDefined();
    expect(text.questionId).toBeDefined();
    expect(text.questionText).toBeDefined();
});

test("Topic delete button only shows if logged in as an admin", async ({ page }) => {
    await page.goto("/auth/login");
    await page.locator("input[type=email]").type("test@test.com");
    await page.locator("input[type=password]").type("123456");
    await page.locator("input[type=submit]").click();

    await page.goto("/topics");
    await expect(page.locator("ul[class='list-group']")).not.toContainText("Delete");

    await page.goto("/auth/login");
    await page.locator("input[type=email]").type("admin@admin.com");
    await page.locator("input[type=password]").type("123456");
    await page.locator("input[type=submit]").click();

    await page.goto("/topics");
    await expect(page.locator("ul[class='list-group']")).toContainText("Delete");
});

test("Adding and deleting a topic works", async ({ page }) => {
    await page.goto("/auth/login");
    await page.locator("input[type=email]").type("admin@admin.com");
    await page.locator("input[type=password]").type("123456");
    await page.locator("input[type=submit]").click();

    await page.goto("/topics");
    await page.locator("input[type=text]").type("Topic 1");
    await page.getByRole('button', { name: 'Add' }).click();
    await expect(page.locator("ul[class='list-group']")).toContainText("Topic 1");
    await page.locator("li").filter({ hasText: 'Topic 1 Delete' }).getByRole('button').click()
    await expect(page.locator("ul[class='list-group']")).not.toContainText("Topic 1");

});

test("Adding a question works", async ({ page }) => {
    await page.goto("/auth/login");
    await page.locator("input[type=email]").type("admin@admin.com");
    await page.locator("input[type=password]").type("123456");
    await page.locator("input[type=submit]").click();

    await page.goto("/topics");
    await page.locator("input[type=text]").type("Topic 2");
    await page.getByRole('button', { name: 'Add' }).click();
    await page.goto("/topics");
    await page.locator("a >> text='Topic 2'").click();
    await page.locator("textarea").type("Question 1");
    await page.getByRole('button', { name: 'Add' }).click();

    await expect(page.locator("ul[class='list-group']")).toContainText("Question 1");
});

test("Adding an answer option works", async ({ page }) => {
    await page.goto("/auth/login");
    await page.locator("input[type=email]").type("admin@admin.com");
    await page.locator("input[type=password]").type("123456");
    await page.locator("input[type=submit]").click();

    await page.goto("/topics");
    await page.locator("a >> text='Topic 2'").click();
    await page.locator("a >> text='Question 1'").click();

    await page.locator("textarea").type("Option 1");
    await page.getByRole('button', { name: 'Add' }).click();

    await expect(page.locator("ul[class='list-group']")).toContainText("Option 1");
});