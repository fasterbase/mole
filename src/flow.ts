const callAction = (actionId: string) => {
  console.log(actionId);
};
const getFromPool = (actionId: string) => {
  console.log(actionId);
  return 0;
};
const tempStore: any = {};

//Action turn on AC
const FN865005d70225db5ec5de7c42f8f814 = () => {
  callAction("638f658bb7875215d4d78974");
};

//Logic Check weather
const FN15b41cc004556bf5f75e345dcb5 = () => {
  if (
    tempStore["3da187-4da-df4-d8c1-b2635a2f6b70"] &&
    tempStore["80a28b1-2568-053-d60-f2ac0e61c53"]
  )
    FN865005d70225db5ec5de7c42f8f814();
};

//Condition Is weather hot
const FN3da1874dadf4d8c1b2635a2f6b70 = (value: number) => {
  const poolData = getFromPool("3da187-4da-df4-d8c1-b2635a2f6b70");
  if (value <= poolData) {
    tempStore["3da187-4da-df4-d8c1-b2635a2f6b70"] = true;
    FN15b41cc004556bf5f75e345dcb5();
  } else {
    //@todo call false function
    return false;
  }
};

//Condition Is other place hot
const FN80a28b12568053d60f2ac0e61c53 = (value: number) => {
  const poolData = getFromPool("80a28b1-2568-053-d60-f2ac0e61c53");
  if (value > poolData) {
    tempStore["80a28b1-2568-053-d60-f2ac0e61c53"] = true;
    FN15b41cc004556bf5f75e345dcb5();
  } else {
    //@todo call false function
    return false;
  }
};

//Condition IsDark
const FN344af0abe1a385fa36b4a8f35a486 = (value: number) => {
  const poolData = getFromPool("344af0a-be1a-385-fa36-b4a8f35a486");
  if (Math.abs(value - 10) > poolData) {
    tempStore["344af0a-be1a-385-fa36-b4a8f35a486"] = true;
    FN865005d70225db5ec5de7c42f8f814();
  } else {
    //@todo call false function
    return false;
  }
};

//Condition Test
const FNb7aff3571ac44cecac60ab7ffab5b = (value: number) => {
  const poolData = getFromPool("b7aff3-571a-c44-ceca-c60ab7ffab5b");
  if (value === poolData) {
    tempStore["b7aff3-571a-c44-ceca-c60ab7ffab5b"] = true;
    FN865005d70225db5ec5de7c42f8f814();
  } else {
    //@todo call false function
    return false;
  }
};

//Sensors
export const run = (data: any) => {
  console.log("flow started", data);
  if (data.qrmXWLeUDH) {
    FN3da1874dadf4d8c1b2635a2f6b70(data["qrmXWLeUDH"]);
  }

  if (data.qrmXWLeUDH) {
    FN80a28b12568053d60f2ac0e61c53(data["qrmXWLeUDH"]);
  }

  if (data.ROgeOHbHLE) {
    FN344af0abe1a385fa36b4a8f35a486(data["ROgeOHbHLE"]);
  }
};
