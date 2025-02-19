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

export const CompleteInfo: Story = {
  ...Template,
  args: {
    violation: {
      violation_type: "Illegal Parking",
      description: "Parking in a no parking zone.",
      violation_date: "11/11/2024",
      paid_status: true,
    },
  },
};

export const PartialInfo: Story = {
  ...Template,
  args: {
    violation: {
      violation_type: "Illegal Parking",
    },
  },
};
