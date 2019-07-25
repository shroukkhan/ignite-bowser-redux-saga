/**
 * Created by shroukkhan on 7/22/17.
 */
//@flow
const fs = require("fs");
const path = require("path");
const snake = require("to-snake-case");
let directory = path.resolve(__dirname) + "/generators/";
let template = require("./generators/template.json");

let reducerTemplateNoArgument = `export const {fncName} = (state:Immutable) => {
  return state.merge(
    {
      {fetching}:{trueFalse}
    });
};`;

let reducerTemplateOneArgument = `export const {fncName} = (state:Immutable, action) => {
  return state.merge(
    {
        {fetching}:{trueFalse},
        {arg1}:action.{arg1},
        
    });
};`;
let reducerTemplateTwoArgument = `export const {fncName} = (state:Immutable,action:{fncName}Action) => {
  return state.merge(
    {
        {fetching}:{trueFalse},
        {arg1}:action.{arg1},
        {arg2}:action.{arg2},
    })
};`;
let typeTemplate = "[Types.{screamingFncName}]: {fncName},";
let sagaTemplate = `export function * {fncName}(action:{ {fncName}Action:any } ) {
  const tag = "[{screamingFncName}]";
  try {
    //step 1: perform input validation
    let inputValid = false; // validate action object here
    if (inputValid) {
        //step 2 : validation passed..
        const response = yield call(API.{fncName});
        const data = validateOrThrowApiResponse(response)
        yield put(Actions.{sucFncName}(data))
    } else {
        throw new Error("INVALID_ACTION_OBJECT"); 
    } 
  }
  catch (e) {
    console.warn(\`\${tag} {fncName} failed with error :\` , e);
    let message = e.message ? e.message : "Failed";
    yield put(Actions.{errFncName}(message));
  }
}
`;

let sagaIndexTemplate = "takeLatest(OkkamiCoreReduxTypes.{screamingFncName}, {fncName}),";

let reducers = [];
let functionDefinitions = [];
let types = [];
let sagas = [];
let sagaIndexes = [];

let reqKey = "";

function lowercaseFirstLetter(string) {
    return string
        .charAt(0)
        .toLowerCase() + string.slice(1);
}

for (let key in template) {
    let value = template[key];

    let fncName = key;
    let screamingFncName = snake(fncName)
        .toUpperCase()
        .trim();

    let reducer = "";
    let functionDefinition = `${key}:`;
    functionDefinition += value === null
        ? "null"
        : JSON.stringify(value);
    functionDefinition = functionDefinition.replace(/"/g,"\"");
    functionDefinition +=",";

    let type = "";
    let saga = "";
    let sagaIndex = "";

    if (fncName.indexOf("request") === 0) {
        reqKey = fncName
            .replace("request", "")
            .trim();
        reqKey = lowercaseFirstLetter(reqKey);

        let sucFncName = reqKey + "Success";
        let errFncName = reqKey + "Failure";

        saga = sagaTemplate
            .replace(/{fncName}/g, fncName)
            .replace(/{sucFncName}/g, sucFncName)
            .replace(/{errFncName}/g, errFncName)
            .replace(/{screamingFncName}/g, screamingFncName);

        sagaIndex = sagaIndexTemplate
            .replace(/{fncName}/g, fncName)
            .replace(/{screamingFncName}/g, screamingFncName);

        sagas.push(saga);
        sagaIndexes.push(sagaIndex);

        reducers.push("");
        types.push("");
    }

    let fetching = reqKey + "Fetching";
    let trueFalse = new Boolean(fncName.indexOf("request") === 0); //eslint-disable-line
    if (value && value.length === 1) {
        let arg1 = value[0].trim();
        reducer = reducerTemplateOneArgument
            .replace(/{fncName}/g, fncName)
            .replace(/{arg1}/g, arg1)
            .replace(/{fetching}/g, fetching)
            .replace(/{trueFalse}/g, trueFalse.toString());
    } else if (value && value.length === 2) {
        let arg1 = value[0].trim();
        let arg2 = value[1].trim();
        reducer = reducerTemplateTwoArgument
            .replace(/{fncName}/g, fncName)
            .replace(/{arg1}/g, arg1)
            .replace(/{arg2}/g, arg2)
            .replace(/{fetching}/g, fetching)
            .replace(/{trueFalse}/g, trueFalse.toString());
    } else {
        reducer = reducerTemplateNoArgument
            .replace(/{fncName}/g, fncName)
            .replace(/{fetching}/g, fetching)
            .replace(/{trueFalse}/g, trueFalse.toString());
    }

    type = typeTemplate
        .replace(/{fncName}/g, fncName)
        .replace(/{screamingFncName}/g, screamingFncName);

    reducers.push(reducer);
    types.push(type);
    functionDefinitions.push(functionDefinition);
}

function write(file, array) {
    array
        .forEach(function (data) {
            fs.appendFileSync(file, data);
            fs.appendFileSync(file, "\n");
        });
}

//--
let output = directory + "/reducers";
fs.writeFileSync(output, "");
write(output, ["","",`/*---------- ${reqKey} --------*/`,""]);
write(output, functionDefinitions);
write(output, ["","",`/*---------- ${reqKey} --------*/`,""]);
write(output, reducers);
write(output, ["","",`/*---------- ${reqKey} --------*/`]);
write(output, types);
//--
// output = directory + "/types";
// fs.writeFileSync(output, "");
// write(output, types);
//--
output = directory + "/sagas";
fs.writeFileSync(output, "");
write(output, sagas);
write(output, ["", "", "---", "", ""]);
write(output, sagaIndexes);

process.exit(0);
