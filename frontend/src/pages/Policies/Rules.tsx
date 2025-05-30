import Header from "../../components/Header";
import RulesComponents from "../../components/ruleComp";
const Rules = () => {
  return (
    <div className="flex flex-col items-center bg-policies-bg bg-cover bg-no-repeat sm:bg-top md:bg-right lg:bg-left w-screen h-screen">

      <div 
      className="w-full"
      >
        <Header />
      </div>

      <RulesComponents />
      
    </div>
  );
};

export default Rules;
