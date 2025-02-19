import { MemoryRouter } from "react-router-dom";
import ViolatorsListCard from "../components/ViolatorsListCard";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ViolatorsListCard> = {
  title: "ViolatorsListCard",
  component: ViolatorsListCard,
};

export default meta;

type Story = StoryObj<typeof meta>;

const Template: Story = {
  render: (args) => (
    <MemoryRouter>
      <ViolatorsListCard {...args} />
    </MemoryRouter>
  ),
};

export const Base: Story = {
  ...Template,
  args: {
    first_name: "",
    last_name: "",
    driver_type: "Select",
    license_number: "",
    violations: [],
  },
};

export const Complete: Story = {
  ...Template,
  args: {
    first_name: "AJ",
    last_name: "Marahuyo",
    driver_type: "Faculty",
    license_number: "5050ilo",
    violations: [
      {
        description: "Parking on a no parking zone.",
        driver_id: "78009163-8fa1-47a9-9757-071a40d0f428",
        id: "d92bdea1-6cb2-4918-a6ac-9508b65810d2",
        paid_status: true,
        violation_date: "2024-12-19T16:00:00.000Z",
        violation_type: "Illegal Driving",
      },
    ],
  },
};

export const Incomplete: Story = {
  ...Template,
  args: {
    first_name: "",
    last_name: "",
    driver_type: "Staff",
    license_number: "6402miafv",
    violations: [
        {
        description: "Parking on a no parking zone.",
        driver_id: "78009163-8fa1-47a9-9757-071a40d0f428",
        id: "d92bdea1-6cb2-4918-a6ac-9508b65810d2",
        paid_status: true,
        violation_date: "2024-12-19T16:00:00.000Z",
        violation_type: "Illegal Driving",
      },
    ],
  },
};
