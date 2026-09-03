export default function Button({ children, variant = "primary", href, onClick, className = "" }) {
  const base =
    "inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-display transition-colors duration-300";

  const styles = {
    primary: "bg-ink text-bg hover:bg-accent hover:text-bg",
    secondary: "border border-line text-ink hover:border-accent hover:text-accent",
    ghost: "text-muted hover:text-ink underline-offset-4 hover:underline",
  };

  const Comp = href ? "a" : "button";

  return (
    <Comp href={href} onClick={onClick} className={`${base} ${styles[variant]} ${className}`}>
      {children}
    </Comp>
  );
}
