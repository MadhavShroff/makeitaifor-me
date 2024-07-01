import Sidebar from "../../components/modules-page/Sidebar";

const ModulesIndex = () => {
  return (
    <div className="flex ">
      <Sidebar />
      <div className="ml-52 p-4 w-full h-screen">
        <section id="section1" className="h-screen bg-red-400 mb-4 rounded p-4">
          <h1 className="text-3xl">Google Search Module</h1>
        </section>
        <section
          id="section2"
          className="h-screen bg-green-400 mb-4 rounded p-4"
        >
          <h1 className="text-3xl">Module 2</h1>
          <p>demo for module 2...</p>
        </section>
        <section
          id="section3"
          className="h-screen bg-blue-400 mb-4 rounded p-4"
        >
          <h1 className="text-3xl">Module 3</h1>
          <p>demo for module 3...</p>
        </section>
        <section
          id="section4"
          className="h-screen bg-yellow-400 mb-4 rounded p-4"
        >
          <h1 className="text-3xl">Module 4</h1>
          <p>demo for module 4...</p>
        </section>
      </div>
    </div>
  );
};

export default ModulesIndex;
