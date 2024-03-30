const handleChange = (e, formData, setFormData) => {
  const { id, value } = e.target;
  let newValue = value;

  // Validate input based on the field ID
  if (id === "firstName" || id === "lastName" || id === "tag") {
    newValue = value.replace(/[^a-zA-Z\s]/g, "");
  } else if (id === "age") {
    newValue = value.replace(/\D/g, "");
    if (
      newValue !== "" &&
      (parseInt(newValue) < 0 || parseInt(newValue) > 120)
    ) {
      newValue = formData.age;
    }
  } else if (id === "phoneNumber") {
    newValue = value.replace(/(?:\+|(?!^))\+|[^+\d]/g, "");
    if (newValue.length > 20) {
      newValue = newValue.substring(0, 20);
    }
  }

  setFormData({
    ...formData,
    [id]: newValue,
  });
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

export { handleChange, formatDate };
