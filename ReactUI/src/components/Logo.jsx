const wrapperStyles = {
    display: "flex",
    alignItems: "center",
    marginBottom: "1rem",
};

const titleStyles = {
    fontSize: "1em",
    margin: "0 0.5rem",
};

const lineStyles = {
    flex: 1,
    height: "0.375rem",
    backgroundColor: "#0E6EB8",
    borderRadius: "1rem",
};

const Logo = (props) => (
    <div style={wrapperStyles}>
        <div style={lineStyles}></div>
        <h1 style={titleStyles}>{props.children}</h1>
        <div style={lineStyles}></div>
    </div>
);

export default Logo;
