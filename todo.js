// todo.js
const to_do_List = () => 
{
  let better_call_saul = [];
  const add = (todoItem) => {better_call_saul.push(todoItem);};
  const markAsComplete = (index) => {
    better_call_saul[index].completed = true;
  };

  const overdue = () => {
    return better_call_saul.filter((item) => item.dueDate < new Date().toLocaleDateString("en-CA"));
  };

  const dueToday = () => {
    return better_call_saul.filter((item) => item.dueDate === new Date().toLocaleDateString("en-CA"));
  };

  const dueLater = () => {
    return better_call_saul.filter((item) => item.dueDate > new Date().toLocaleDateString("en-CA"));
  };
  
  return { better_call_saul, add, markAsComplete, overdue, dueToday, dueLater };
};

module.exports = to_do_List;
