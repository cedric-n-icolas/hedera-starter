import { JsonABI } from "./abi";
import { ethers } from "ethers";
import { createSignal } from "solid-js";

const privateKey    = import.meta.env.VITE_HEX_PRIVATE_KEY;
const contractAddr  = import.meta.env.VITE_CONTRACT_ADDRESS;
const jsonRPC       = import.meta.env.VITE_TESTNET_ENDPOINT;

const provider      = new ethers.providers.JsonRpcProvider(jsonRPC);
const wallet        = new ethers.Wallet(privateKey, provider);
const contract      = new ethers.Contract(contractAddr,JsonABI,wallet);

function App() {

  const [value, setValue] = createSignal('');
  const [inputValue, setInputValue] = createSignal('');

  async function getMessage() {
    const result = await contract.getMessage();
    setValue(result);
  }

  async function setMessage() {

    if (inputValue() === '') {
      alert("Please enter a message");

    } else {

      const result = await contract.setMessage(inputValue());
      const receipt = await result.wait();
      
      const msg = `Transaction confirmed in block ${receipt.blockNumber}`;
      
      console.log(msg);
    }
    
  }

  function handleInputChange(e) {
    setInputValue(e.target.value);
  }

  return (
    <div id="content">
      <input type="text" value={value()} /><button type="button" onClick={getMessage}>GetMessage()</button>
      <br />
      <input type="text" value={inputValue()} onInput={handleInputChange} /><button type="button" onClick={setMessage}>SetMessage()</button>
    </div>
  );
}

export default App;