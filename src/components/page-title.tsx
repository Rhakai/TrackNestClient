interface TitleProps {
    title: string;
}

export default function Pagetitle({ title }: TitleProps) {
    return (
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {title}
        </h1>
    );
}