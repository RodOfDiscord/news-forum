import ArticleCard from "./ArticleCard";
import { fn } from '@storybook/test';
const body = (
    <>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <p>Phasellus vehicula justo eget diam posuere sollicitudin.</p>
    </>
);
export default {
    component: ArticleCard,
    parameters: {
        layout: "centered",
    },
    args: {
        title: "Default Article",
        date: new Date().toLocaleDateString(),
        content: body,
        image: "https://picsum.photos/500/600",
        onClick: fn(),
    },
    argTypes: {
        date: {
            control: 'text',
        }
    }

}

export const Default = {
    args: {
        title: "Default Article",
        variant: "default",
    }
}

export const Compact = {
    args: {
        variant: "compact",
        title: "Compact Article",
    }
}

export const SideImage = {
    args: {
        variant: "side-image",
        title: "Side Image Article",
    }
}