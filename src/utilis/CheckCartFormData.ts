type CartFormData = {
  userId: string;
  productId: string;
  quantity: number;
};
export const CheckCartFormData = (data: CartFormData): boolean => {
  if (data.userId === "select") {
    alert("Please select user");
    return false;
  } else if (data.productId === "select") {
    alert("Please select product");
    return false;
  } else if (data.quantity <= 0) {
    alert("Please enter quantity");
    return false;
  }
  return true;
};
