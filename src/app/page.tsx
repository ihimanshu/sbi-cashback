"use client";
import React, { useState } from "react";
import styles from "./page.module.css";

interface InputItem {
  id: number;
  value: number;
  type: string;
}

export default function Home() {
  const [inputs, setInputs] = useState<InputItem[]>([]);
  const [cashback, setCashback] = useState<number>(0);
  const addInput = (type: string) => {
    const newInputs: InputItem[] = [
      ...inputs,
      { id: inputs.length, value: 0, type },
    ];
    setInputs(newInputs);
  };

  const removeInput = (idToRemove: number) => {
    const updatedInputs: InputItem[] = inputs.filter(
      (input) => input.id !== idToRemove
    );
    setInputs(updatedInputs);
    // Re-Calculate the total sum of all input values
    const sum = calculateTotalCashback(updatedInputs);
    setCashback(sum);
  };

  const handleInputChange = (
    id: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedInputs: InputItem[] = inputs.map((input) =>
      input.id === id ? { ...input, value: +event.target.value } : input
    );
    setInputs(updatedInputs);
    // Calculate the total sum of all input values
    const sum = calculateTotalCashback(updatedInputs);
    setCashback(sum);
  };

  const calculateCashback = (value: number, percent: boolean) => {
    return percent
      ? Math.floor(value * 0.04) + Math.floor(value * 0.01)
      : Math.floor(value * 0.01);
  };

  const calculateTotalCashback = (inputs: InputItem[]) => {
    const total = inputs.reduce(
      (acc, curr) =>
        acc + calculateCashback(curr.value, curr.type === "Online"),
      0
    );
    return total;
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get the exact Cashback you will receive on your transaction on SBI
          Cashback Card.
        </p>
      </div>
      <div className={styles.center}>
        <button onClick={() => addInput("Online")}>
          Add Online Transaction
        </button>
        <button onClick={() => addInput("Offline")}>
          Add Offline Transaction
        </button>
      </div>
      <div className="my-font margin-auto center">
        {inputs.length ? (
          <div className={styles.grid}>
            <div>
              <strong>Transaction Amount</strong>
            </div>
            <div>
              <strong>1% Cashback</strong>
            </div>
            <div>
              <strong>4% Cashback</strong>
            </div>
            <div>
              <strong>Total Cashback</strong>
            </div>
            <div>
              <strong>Action</strong>
            </div>
          </div>
        ) : null}
        {inputs.map(({ id, value, type }) => (
          <div key={id} className={styles.grid}>
            <div>
              <p>{type} Transaction</p>
              <input
                type="number"
                placeholder="Enter something"
                value={value}
                onChange={(event) => handleInputChange(id, event)}
                min={0}
              />
            </div>
            {value > 99 ? (
              <>
                <div>{Math.floor(value * 0.01)}</div>
                <div>{type === "Online" ? Math.floor(value * 0.04) : 0}</div>
                <div>
                  {type === "Online"
                    ? calculateCashback(value, type === "Online")
                    : calculateCashback(value, type === "Online")}
                </div>
              </>
            ) : (
              <>
                <div>0</div>
                <div>0</div>
                <div>0</div>
              </>
            )}
            <div>
              <button onClick={() => removeInput(id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <br />
      {inputs.length ? (
        <strong className="my-font center" style={{ fontSize: "30px" }}>
          Total Cashback: {cashback}
        </strong>
      ) : null}
      <br />
      <div className={styles.description}>
        <p>
          <strong>REVISION OF BENEFITS ON CASHBACK SBI CARD:</strong>
          <br />
          <br />
          Urban Company Cashback is 1%, use Offline transaction.
          <br />
          <br />
          Cashback is given when the value of transaction exceeds 99 Rupees.
          <br />
          <br />
          With effect from 01 May 2023, following changes will be applicable on
          your CASHBACK SBI Card:
          <br />
          <br />
          A. Below categories will not be eligible for Cashback benefit, apart
          from existing exclusions:
        </p>
      </div>
      <br />
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Merchant Category Code (MCC)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Jewelry</td>
            <td>
              5111, 5192, 5942, 5943, 8211, 8220, 8241, 8244, 8249, 8299, 8351
            </td>
          </tr>
          <tr>
            <td>School & Educational Services</td>
            <td>5051, 5094, 5944, 7631</td>
          </tr>
          <tr>
            <td>Utilities</td>
            <td>4814, 4900, 9399, 4816, 4899</td>
          </tr>
          <tr>
            <td>Insurance Services</td>
            <td>5960, 6300, 6381</td>
          </tr>
          <tr>
            <td>Card, Gift, Novelty & Souvenir Shops</td>
            <td>5947</td>
          </tr>
          <tr>
            <td>Member Financial Institution/Quasi Cash</td>
            <td>6011, 6012, 6051</td>
          </tr>
          <tr>
            <td>Railways</td>
            <td>4011, 4112</td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}
