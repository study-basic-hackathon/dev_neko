import { Type } from "@google/genai";

export const structuredOutputSetting = {
  type: Type.OBJECT,
  properties: {
    category: {
      type: Type.STRING,
    },
    shop_name: {
      type: Type.STRING,
    },
    branch_name: {
      type: Type.STRING,
    },
    total_price: {
      type: Type.NUMBER,
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
  },
  required: ["shop_name", "total_price", "category"],
};
