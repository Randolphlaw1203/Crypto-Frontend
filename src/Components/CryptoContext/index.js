import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";

const Crypto = createContext()

function CryptoContext({ children }) {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");

  useEffect(() => {
    if (currency === "USD") setSymbol("$");
    else if (currency === "CNY") setSymbol("￥");
  }, [currency]);

  return (
    <Crypto.Provider value={{ currency, setCurrency, symbol }}>
      {children}
    </Crypto.Provider>
  )
} export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto)
}