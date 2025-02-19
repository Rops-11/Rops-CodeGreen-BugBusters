import { MemoryRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import { Meta, StoryObj } from "@storybook/react";
import { screen, userEvent, within } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

const meta: Meta<typeof LoginPage> = {
  title: "LoginPage",
  component: LoginPage,
};

export default meta;

type Story = StoryObj<typeof meta>;

const Template: Story = {
  render: (args) => (
    <MemoryRouter>
      <LoginPage {...args}></LoginPage>
    </MemoryRouter>
  ),
};

export const Base: Story = {
  ...Template,
};

export const RegexErrorPlayTest: Story = {
  ...Template,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const emailInput = canvas.getByPlaceholderText("Email address");
    await userEvent.type(emailInput, "test", { delay: 100 });
    
    const loginButton = canvas.getByRole("button", { name: /login/i });
    await userEvent.click(loginButton);
  },
};

export const NoInputPlayTest: Story = {
  ...Template,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const loginButton = canvas.getByRole("button", { name: /login/i });
    await userEvent.click(loginButton);
  },
};

export const CompleteInputPlay: Story = {
  ...Template,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const emailInput = canvas.getByPlaceholderText("Email address");
    await userEvent.type(emailInput, "test@example.com", { delay: 100 });
    await expect(emailInput).toHaveValue("test@example.com");

    const passwordInput = canvas.getByPlaceholderText("Enter your password");
    await userEvent.type(passwordInput, "password123", { delay: 100 });
    await expect(passwordInput).toHaveValue("password123");

    const loginButton = canvas.getByRole("button", { name: /login/i });
    await userEvent.click(loginButton);
  },
};
