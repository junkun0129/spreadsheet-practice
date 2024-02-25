import { TreeNodeType } from "../types/categoryEx";

// Dummy data for TreeNodeType
export const dummyTreeNodes: TreeNodeType[] = [
  {
    category: {
      code: "1",
      name: "Dummy Category",
      note: "This is a dummy category",
      img: "dummy_category_image.jpg",
      img_mobile: "dummy_category_image_mobile.jpg",
    },
    children: [
      {
        category: {
          code: "2",
          name: "Child Category",
          note: "This is a child category",
          img: "child_category_image.jpg",
        },
        children: [
          {
            category: {
              code: "3",
              name: "Grandchild Category",
              note: "This is a grandchild category",
              img: "grandchild_category_image.jpg",
            },
            // No children for the grandchild category in this example
          },
        ],
      },
    ],
  },
  {
    category: {
      code: "4",
      name: "Dummy Category2",
      note: "This is a dummy category",
      img: "dummy_category_image.jpg",
      img_mobile: "dummy_category_image_mobile.jpg",
    },
    children: [
      {
        category: {
          code: "5",
          name: "Child Category2",
          note: "This is a child category",
          img: "child_category_image.jpg",
        },
        children: [
          {
            category: {
              code: "6",
              name: "Grandchild Category2",
              note: "This is a grandchild category",
              img: "grandchild_category_image.jpg",
            },
            // No children for the grandchild category in this example
          },
        ],
      },
    ],
  },
];
