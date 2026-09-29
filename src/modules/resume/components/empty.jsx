const EmptyState = ({ icon: Icon, title, body, action }) => (
  <div
    className="text-center py-24 border"
    style={{ borderStyle: "dashed", borderColor: "#D8D6CE", backgroundColor: "#FBFBF9" }}
  >
    <div
      className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
      style={{ backgroundColor: "#F0EFEA", color: "#B7B5AC" }}
    >
      <Icon className="w-7 h-7" strokeWidth={1.5} />
    </div>
    <h3 className="font-display text-lg font-medium mb-2" style={{ color: "#1C2333" }}>
      {title}
    </h3>
    <p className="text-sm max-w-sm mx-auto mb-6" style={{ color: "#6B7280" }}>
      {body}
    </p>
    {action}
  </div>
);

export default EmptyState;
