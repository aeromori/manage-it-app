import * as React from "react";
import { Card as FBCard } from "flowbite-react";

type CardProps = React.PropsWithChildren<
    React.HTMLAttributes<HTMLDivElement> & {
        className?: string;
    }
>;
type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;
type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>;
type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;
type CardActionProps = React.HTMLAttributes<HTMLDivElement>;
type CardContentProps = React.HTMLAttributes<HTMLDivElement>;
type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;

function Card({ children, className, ...props }: CardProps) {
    return (
        <FBCard
            data-slot="card"
            className={`bg-card text-card-foreground flex flex-col gap-6 rounded-xl border ${className}`}
            {...props}
        >
            <div className={`flex flex-col gap-4 justify-start h-full w-full`}>
                {children}
            </div>
        </FBCard>
    );
}

function CardHeader({ className = "", ...props }: CardHeaderProps) {
    return (
        <div
            data-slot="card-header"
            className={`@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 ${className}`}
            {...props}
        />
    );
}

function CardTitle({ className = "", ...props }: CardTitleProps) {
    return (
        <h4
            data-slot="card-title"
            className={`leading-none ${className}`}
            {...props}
        />
    );
}

function CardDescription({ className = "", ...props }: CardDescriptionProps) {
    return (
        <p
            data-slot="card-description"
            className={`"text-muted-foreground ${className}`}
            {...props}
        />
    );
}

function CardAction({ className = "", ...props }: CardActionProps) {
    return (
        <div
            data-slot="card-action"
            className={`col-start-2 row-span-2 row-start-1 self-start justify-self-end ${className}`}
            {...props}
        />
    );
}

function CardContent({ className = "", ...props }: CardContentProps) {
    return (
        <div
            data-slot="card-content"
            className={`px-6 last:pb-6 ${className}`}
            {...props}
        />
    );
}

function CardFooter({ className = "", ...props }: CardFooterProps) {
    return (
        <div
            data-slot="card-footer"
            className={`flex items-center px-6 pb-6 [.border-t]:pt-6 ${className}`}
            {...props}
        />
    );
}

export {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardAction,
    CardContent,
    CardFooter,
};
