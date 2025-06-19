import { Type } from "@google/genai";

export const structuredOutputSetting = {
  type: Type.OBJECT,
  properties: {
    shop_name: {
      type: Type.STRING,
    },
    branch_name: {
      type: Type.STRING,
    },
    items: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          item_name: {
            type: Type.STRING,
          },
          item_price: {
            type: Type.NUMBER,
          },
          item_category: {
            type: Type.STRING,
          },
        },
        required: ["item_name", "item_price", "item_category"],
      },
    },
    total_price: {
      type: Type.NUMBER,
    },
  },
  required: ["shop_name", "total_price"],
};
