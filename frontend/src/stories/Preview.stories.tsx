import { MemoryRouter } from "react-router-dom";
import PreviewProfile from "../components/PreviewProfile";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof PreviewProfile> = {
  title: "PreviewProfile",
  component: PreviewProfile,
};

export default meta;

type Story = StoryObj<typeof meta>;

const Template: Story = {
  render: (args) => (
    <MemoryRouter>
      <div className="w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
        <PreviewProfile {...args}></PreviewProfile>
      </div>
    </MemoryRouter>
  ),
};

export const Base: Story = {
  ...Template,
  args: {
    selectedEntry: {
      id: "1",
      last_name: "Doe",
      first_name: "John",
      sex: "Male",
      date_of_birth: "01/01/2001",
      driver_type: "Student",
      license_number: "123-123-123",
      license_expiration_date: "01/01/2030",
    },
  },
};
