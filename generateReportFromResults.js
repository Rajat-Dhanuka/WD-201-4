let File_sys = require("fs");

let generate_Feedback = (passed, results) =>
 {
  const ass = results["assertionResults"]
    .map((item) =>
     {
      let status = item["status"];

      let title = item["title"];

      let statusSymbol = status == "passed" ? "✓" : "✗";

      return `${statusSymbol} ${title}`;

    }).join("\n\n");

  let errorMessage = results["message"];

  const feedback = ass + "\n\n" + errorMessage;

  return feedback;
};

const write = (data) =>
 {
  console.log(data);

  let reportFile = "./report.json";

  File_sys.writeFileSync(reportFile, JSON.stringify(data));

};

const read = async (filePath) => 
{
  try {
    const data = await File_sys.promises.read(filePath, "utf8");
    return data;
  } 
  catch (err) {
    console.log("File not found | Grading Skipped");
  }
};

read("results.json").then((data) => 
{
  if (data) 
  {
    let results = JSON.parse(data);
    const passed = results["testResults"][0]["status"] == "passed";
    let feedback = generate_Feedback(passed, results["testResults"][0]);
    write({version: 0, grade: passed ? "accept" : "reject", status: passed ? "success" : "failure", feedback: feedback, report: feedback,});
  } 
  else 
  {
    write({version: 0,grade: "skip",status: "failure",feedback:"We are unable to test your submission - something about it was too different from what we were expecting. Please check the instructions for this task and try again. If you have seen this message more than once, please reach out to Pupilfirst team for support.",
      report: "Unable to generate report due to missing results.json.",});
  }
});
