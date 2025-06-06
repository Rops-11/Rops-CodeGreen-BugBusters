import Header from "../../components/Header";
import ProtocolComp from "../../components/ProtocolComp";
const Protocols = () => {
  return (
    <div className="flex flex-col items-center bg-policies-bg bg-cover bg-no-repeat sm:bg-top md:bg-right lg:bg-left w-screen h-screen">

      <div 
      className="w-full"
      >
        <Header/>
      </div>
        <ProtocolComp/>
    </div>
  );
};

export default Protocols;
