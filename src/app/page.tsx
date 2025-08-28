"use client";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
type product = {
  productsName: string;
  price: number;
  stock: number;
  id: number;
};
type addType = {
  productsName: string;
  price: number;
  stock: number;
  id: number;
  count: number;
};
type inputs = {
  productsName: string;
  price: number;
  stock: number;
};

export default function Home() {
  const [inputValues, setInputValues] = useState<inputs>({
    productsName: "",
    price: 0,
    stock: 0,
  });
  const [addInput, setAddInput] = useState<addType[]>([]);
  const [addCardInput, setAddCardInput] = useState<addType[]>([]);
  const [total, setTotal] = useState<number>(0);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValues({ ...inputValues, [name]: value });
  };
  const Add = () => {
    setAddInput([
      ...addInput,
      {
        productsName: inputValues.productsName,
        price: inputValues.price,
        stock: inputValues.stock,
        id: Date.now(),
        count: 1,
      },
    ]);
  };
  const AddCart = (product: product) => {
    const productId = product.id;
    const CardProduct = {
      productsName: product.productsName,
      price: product.price,
      stock: product.stock,
      id: product.id,
      count: 1,
    };

    setAddInput((prev) => {
      return prev.map((pr) => {
        return pr.id === productId
          ? { ...pr, stock: Number(pr.stock) - 1 }
          : pr;
      });
    });

    setAddCardInput((prev) => {
      const existing = prev.find((item) => item.id === CardProduct.id);
      if (existing) {
        return prev.map((el) => {
          return el.id === CardProduct.id
            ? { ...el, count: Number(el.count) + 1 }
            : el;
        });
      } else {
        return [...prev, CardProduct];
      }
    });
  };

  const deleteButton = (prev: number) => {
    const deletedInput = addInput.filter((product) => product.id !== prev);
    setAddInput(deletedInput);
    setAddCardInput(deletedInput);
  };

  // const totalFunc = (total:number) => {
  //   const producPrice=total.price
  // };
  return (
    <div className="m-8">
      <p className="">Product Store</p>
      <div className="shadow-xl rounded-sm h-fit w-fit bg-gray-200 p-4">
        <p>Add products</p>
        <div className="flex">
          <input
            name="productsName"
            placeholder="Products Name..."
            value={inputValues.productsName}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <input
            name="price"
            placeholder="Price"
            value={inputValues.price}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <input
            name="stock"
            min="0"
            placeholder="Stock"
            value={inputValues.stock}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <button
            onClick={() => {
              Add();
            }}
          >
            Add
          </button>
        </div>
      </div>
      <div className="flex ">
        <div className="flex flex-col gap-4 p-2">
          Porducts({addInput.length})
          {addInput.map((product) => {
            return (
              <div
                key={product.id}
                className="border-1 w-80 h-fit rounded-sm gap-4 p-2"
              >
                <div className="flex justify-between ">
                  <div>{product.productsName}</div>
                  <div className="flex gap-2 w-fit h-fit">
                    <button className="border rounded-sm text-blue-500 border-solid-200 p-1">
                      Edit
                    </button>
                    <button
                      className="border rounded-sm text-red-500 border-solid-200 p-1"
                      onClick={() => {
                        deleteButton(product.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  ${product.price} • Stock: {product.stock}
                </div>
                <button
                  className="shadow-lg w-fit h-fit rounded-sm bg-green-500 p-1 text-white"
                  onClick={() => {
                    AddCart(product);
                  }}
                >
                  Add to Card
                </button>
              </div>
            );
          })}
        </div>
        <div className=" flex flex-col gap-4 p-2">
          Cart({addCardInput.length} items)
          <div className="border-1 rounded-sm w-100 h-fit gap-2 p-2">
            {addCardInput.map((product) => {
              return (
                <div key={product.id}>
                  <div className="flex justify-between">
                    <div className="flex-col ">
                      <div>{product.productsName}</div>
                      <div className="text-gray-400 text-sm">
                        ${product.price} each
                      </div>
                    </div>
                    <div className="flex justify-center items-center">
                      <input
                        type="number"
                        min="1"
                        className="border border-solid-300 rounded-l w-[100px]"
                        value={product.count}
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                      <div>
                        ${Number(product.price) * Number(product.count)}.00
                      </div>
                    </div>
                  </div>
                  <hr className="pt-2" />
                </div>
              );
            })}
            <hr className="pt-2" />
            <div>
              <div
                // onClick={() => {
                //   totalFunc(total);
                // }}
                className="flex justify-between"
              >
                Total: $.00
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
