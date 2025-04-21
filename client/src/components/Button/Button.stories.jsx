import { fn } from '@storybook/test';
import { Button } from './Button';

export default {
    component: Button,
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
    }
}
export const Secondary = {
    args: {
        variant: "secondary",
    }
}
export const Disabled = {
    args: {
        disabled: true,
    },
};

