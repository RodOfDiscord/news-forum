import { fn } from '@storybook/test';
import { Button } from './Button';

export default {
    component: Button,
    tags: ['autodocs'],
    parameters: {
        layout: "centered",
    },
    args: {
        onClick: fn(),
        children: "Button",
        disabled: false,
    }
}

export const Primary = {
    args: {
        variant: "primary",
    }
}
export const Secondary = {
    args: {
        variant: "secondary",
    }
}
export const Disabled = {
    args: {
        variant: "primary",
        disabled: true,
    },
};

