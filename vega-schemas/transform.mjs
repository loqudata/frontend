import fs from "fs";
import { exit } from "process";

const text = fs.readFileSync("./vl_5.json", "utf-8");

// TODO: maybe make CLI
// program
//   .command('clone <source> [destination]')
//   .description('clone a repository into a newly created directory')
//   .action((source, destination) => {
//     console.log('clone command called');
//   });

const data = JSON.parse(text);

const hasAnyOf = (obj) => Array.isArray(obj.anyOf); // && !obj.anyOf._done;

const isExcluded = (v) =>
  v.$ref ? v.$ref.includes("ExprRef") || v.$ref.includes("Conditional") : false;

const handleAnyOf = (obj) => {
  const l = obj.anyOf;
  const n = l.filter((v) => {
    // console.error(v.type);
    // if (obj.description?.includes("Default stroke color")) {
    //   console.error(v.type === "null", isExcluded(v));
    // }
    return !(v.type === "null" || isExcluded(v));
  });
  // if (obj.description?.includes("Color of axis domain line")) {
  //   console.error(n);
  // }
  //   console.error(n.length);
  if (n.length == 1) {
    //   we take the first and now only anyof item and make it the main
    return handle(n[0]);
  }
  if (n.length == 0) {
    // console.warn("Empty anyOf for item", obj?.description);
    // From observation, these are all the Conditionals that we got rid of. Nothing refers to them
    const c = obj;
    obj.anyOf = undefined;
    obj.type = "string";
    // obj._emptyAnyof = true;
    return handle(c);
  } else {
    let f = n.map((v) => handle(v));
    //   we leave the anyof thats been cleaned and return the parent obj
    obj.anyOf = f;
    // obj.anyOf._done = true;
    return obj;
  }
};

const hasProperties = (obj) => obj.hasOwnProperty("properties");

// hasMultipleTypes
const typesArray = (obj) => Array.isArray(obj.type);
//  && obj.type.length > 1

const handleProperties = (obj) => {
  const before = obj;
  let object = before.properties;
  for (const key in object) {
    if (Object.hasOwnProperty.call(object, key)) {
      const element = object[key];
      object[key] = handle(element);
    }
  }
  return before;
};

const fail = () => {
  console.error("FAIL");
  exit(1);
};

// Takes a JSON object, should return that same object, with appropriate modifications if necessary
const handle = (obj) => {
  let a = obj;
  if (hasProperties(a) || hasAnyOf(a)) {
    let b = null;
    if (hasProperties(a) && hasAnyOf(a)) {
      console.error("Has both properties and anyOf");
      exit(1);
    } else if (hasAnyOf(a)) {
      b = handleAnyOf(a);
    } else if (hasProperties(a)) {
      b = handleProperties(a);
    } else {
      fail();
    }
    if (b == null) {
      fail();
    }
    return b;
  } else {
    // Base case: no `properties` or `anyof`, just a `type` (potentially an array)
    //   base case
    if (typesArray(a)) {
      // If greater than one or just one, pick first type, unless first is null. We will have gotten rid of nulls by now. (only in anyOfs)
      a.type = a.type.filter((v) => v !== "null")[0];
    }
    return a;
  }
};

// console.log(data);
// const out = Object.fromEntries(
//   Object.entries(data.Axis.properties).map(([name, p]) => [name, handle(p)])
// );
function main() {
  let object = data.definitions;
  for (const key in object) {
    if (Object.hasOwnProperty.call(object, key)) {
      const element = object[key];
      object[key] = handle(element);
    }
  }

  //   is data mutated? should be
  const outString = JSON.stringify(data, undefined, 4);
  console.log(outString);
}
main();
