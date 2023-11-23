import { Children, useState } from "react";
import "./App.css";

const options = [
  { percentage: 0, option: `Dissatisfied (0%)` },
  { percentage: 5, option: `It was okay (5%)` },
  { percentage: 10, option: `It was good (10%)` },
  { percentage: 20, option: `Absolutely amazing! (20%)` },
];

export default function App() {
  const [bill, setBill] = useState("");
  const [yourPercentage, setyourPercentage] = useState(0);
  const [yourFriendPercentage, setyourFriendPercentage] = useState(0);

  function handleBill(e) {
    setBill(e.target.value);
  }
  function handleChooseyourPercentage(e) {
    setyourPercentage(e.target.value);
  }
  function handleChooseyourFriendPercentage(e) {
    setyourFriendPercentage(e.target.value);
  }
  function handleReset() {
    setBill("");
    setyourPercentage(0);
    setyourFriendPercentage(0);
  }
  return (
    <div>
      <Bill bill={bill} setBill={handleBill} />
      <Percentage
        percentage={yourPercentage}
        onClick={handleChooseyourPercentage}
        options={options}
      >
        How did you like the service?
      </Percentage>
      <Percentage
        percentage={yourFriendPercentage}
        onClick={handleChooseyourFriendPercentage}
        options={options}
      >
        How did your friend like the service?
      </Percentage>
      {bill !== "" ? (
        <Result
          bill={Number(bill)}
          yourPercentage={Number(yourPercentage)}
          yourFriendPercentage={Number(yourFriendPercentage)}
        />
      ) : (
        <></>
      )}
      <ResetButton onReset={handleReset} />
    </div>
  );
}

function Bill({ bill, setBill }) {
  return (
    <div>
      <label>How much was the bill? </label>{" "}
      <input
        type="number"
        placeholder="Bill Value"
        value={bill}
        onChange={(e) => {
          setBill(e);
        }}
      />
    </div>
  );
}

function Percentage({ options, percentage, onClick, children }) {
  return (
    <div>
      <p>
        <label>{children}</label>
        <select value={percentage} onChange={(e) => onClick(e)}>
          {options.map((option) => (
            <option
              value={option.percentage}
              style={{ textAlign: "center", backgroundColor: "#c7c7c7c7" }}
            >
              {option.option}
            </option>
          ))}
        </select>
      </p>
    </div>
  );
}

function Result({ bill, yourPercentage, yourFriendPercentage }) {
  console.log(yourPercentage);
  console.log(yourFriendPercentage);
  const avgPercentage = (yourPercentage + yourFriendPercentage) / 2;
  const total = bill + bill * (avgPercentage / 100);
  return (
    <div>
      <h3>
        You pay {`$${total}($${bill}+$${bill * (avgPercentage / 100)} tip)`}
      </h3>
    </div>
  );
}

function ResetButton({ onReset }) {
  return <button onClick={onReset}>Reset</button>;
}
