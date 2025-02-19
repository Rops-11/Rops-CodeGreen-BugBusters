import { MemoryRouter } from "react-router-dom";
import ViolationCard from "../components/ViolationCard";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ViolationCard> = {
  title: "ViolationCard",
  component: ViolationCard,
};

export default meta;

type Story = StoryObj<typeof meta>;

const Template: Story = {
  render: (args) => (
    <MemoryRouter>
      <ViolationCard {...args} />
    </MemoryRouter>
  ),
};

export const Base: Story = {
  ...Template,
  args: {
    violation: {},
  },
};
