import { MemoryRouter } from "react-router-dom";
import DriversListCard from "../components/DriversListCard";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof DriversListCard> = {
    title: "DriversListCard",
    component: DriversListCard
};

export default meta;

type Story = StoryObj<typeof meta>;

const Template: Story = {
    render: (args) => (
        <MemoryRouter>
            <DriversListCard {...args} />
        </MemoryRouter>
    )
};

export const Base: Story = {
    ...Template,
    args: {
        id: "",
        first_name: "",
        last_name: "",
        driver_type: "Select",
        license_number: ""
    },
};

export const Full: Story = {
    ...Template,
    args: {
        id: "12bgbubs3423fsoujdn",
        first_name: "Wyatt",
        last_name: "Thorne",
        driver_type: "Student",
        license_number: "rvc0501"
    }
};

export const Incomplete: Story = {
    ...Template,
    args: {
        id: "12bgbubs3423fsoujdn",
        first_name: "Wyatt",
        last_name: "",
        driver_type: "Student",
        license_number: ""
    }
};