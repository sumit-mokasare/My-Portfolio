import Hero from "./pages/Hero";
import AvatarCanvas from "./components/AvatarCanvas";
import CustomCursor from "./components/CustomCursor";

export default function App() {
  const noSelectStyle = {
    WebkitUserSelect: "none" /* Safari */,
    MozUserSelect: "none" /* Old versions of Firefox */,
    msUserSelect: "none" /* Internet Explorer/Edge */,
    userSelect: "none" /* Non-prefixed version, currently supported by most browsers */,
  };
  return (
    <div style={noSelectStyle}>
      <CustomCursor />
      <Hero avatarSlot={<AvatarCanvas />} />
    </div>
  );
}
