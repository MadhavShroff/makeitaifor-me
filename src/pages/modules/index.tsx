import { fetchUser } from "@/utils/fetches";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/landing-page/Navbar";
import { AnimatePresence, motion } from "motion/react"
import Block from "@/components/GraphRendering/Block";
import CitedContentDisplay from "@/components/CitedContentDisplay"; // Add this import

class EntityType {
  constructor() { }
}

class ENumber extends EntityType {
  value: number;
  constructor(value: number) {
    super();
    this.value = value;
  }
}

class InputType {
  name: string;
  type: EntityType;
  description: string;
  optional: boolean = false;
  constructor(name: string, type: EntityType, description: string, optional: boolean = false) {
    this.name = name;
    this.type = type;
    this.description = description;
    this.optional = optional;
  }
}

type IOType = {
  name: string;
  type: string;
  description: string;
  optional?: boolean;
}

export type ModuleType = {
  description: string;
  background: string;
  border: string;
  textColor: string;
  id: string;
  inputs: IOType[];
  outputs: IOType[];
};

const modulesIO : Record<string, ModuleType> = {
  "Timeout": {
    description: "Pauses execution for a specified duration.",
    background: "bg-blue-100",
    border: "border-blue-300",
    textColor: "text-blue-800",
    id: "Timeout",
    inputs: [
      {
        name: "time",
        type: "ENumber",
        description: "Time in seconds"
      }
    ],
    outputs: []
  },
  "Schedule": {
    id: "Schedule",
    description: "Schedules a task to run at a specified time or after a delay.",
    background: "bg-blue-100",
    border: "border-blue-300",
    textColor: "text-blue-800",
    inputs: [
      {
        name: "time",
        type: "EDate",
        optional: true,
        description: "Time in seconds"
      }
    ],
    outputs: []
  },
  "Add": {
    id: "Add",
    description: "Adds two numbers together.",
    background: "bg-green-100",
    border: "border-green-300",
    textColor: "text-green-800",
    inputs: [
      {
        name: "x",
        type: "ENumber",
        description: "First number"
      },
      {
        name: "y",
        type: "ENumber",
        description: "Second number"
      }
    ],
    outputs: [
      {
        name: "result",
        type: "ENumber",
        description: "Sum of x and y"
      }
    ]
  },
  "Subtract": {
    id: "Subtract",
    description: "Subtracts one number from another.",
    background: "bg-green-100",
    border: "border-green-300",
    textColor: "text-green-800",
    inputs: [
      {
        name: "x",
        type: "ENumber",
        description: "First number"
      },
      {
        name: "y",
        type: "ENumber",
        description: "Second number"
      }
    ],
    outputs: [
      {
        name: "result",
        type: "ENumber",
        description: "Difference of x and y"
      }
    ]
  },
  "Multiply": {
    id: "Multiply",
    description: "Multiplies two numbers together.",
    background: "bg-green-100",
    border: "border-green-300",
    textColor: "text-green-800",
    inputs: [
      {
        name: "x",
        type: "ENumber",
        description: "First number"
      },
      {
        name: "y",
        type: "ENumber",
        description: "Second number"
      }
    ],
    outputs: [
      {
        name: "result",
        type: "ENumber",
        description: "Product of x and y"
      }
    ]
  },
  "Divide": {
    id: "Divide",
    description: "Divides one number by another.",
    background: "bg-green-100",
    border: "border-green-300",
    textColor: "text-green-800",
    inputs: [
      {
        name: "x",
        type: "ENumber",
        description: "First number"
      },
      {
        name: "y",
        type: "ENumber",
        description: "Second number"
      }
    ],
    outputs: [
      {
        name: "result",
        type: "ENumber",
        description: "Quotient of x and y"
      }
    ]
  },
  "SQLOperation": {
    id: "SQLOperation",
    description: "Executes a specified SQL query or operation on table data.",
    background: "bg-green-100",
    border: "border-green-300",
    textColor: "text-green-800",
    inputs: [
      {
        name: "A SQL Query",
        type: "EString",
        description: "SQL query"
      },
      {
        name: "A Table",
        type: "ETable",
        description: "Table to perform the operation on"
      },
      {
        name: "Table Description",
        type: "EString",
        description: "Description of the table"
      },
      {
        name: "Another Table",
        type: "ETable",
        description: "Another table to perform the operation on",
        optional: true
      }
    ],
    outputs: [
      {
        name: "result",
        type: "ETable",
        description: "Result of the SQL operation"
      }
    ]
  },
  "RunCodeSnippet": {
    id: "RunCodeSnippet",
    description: "Executes a short code snippet with minimal dependencies.",
    background: "bg-green-100",
    border: "border-green-300",
    textColor: "text-green-800",
    inputs: [],
    outputs: []
  },
  "InvokeWolframAlpha": {
    id: "InvokeWolframAlpha",
    description: "Makes a query to WolframAlpha for computation or knowledge retrieval.",
    background: "bg-white",
    border: "border-red-500",
    textColor: "text-red-900",
    inputs: [],
    outputs: []
  },
  "GenerateSearchQueries": {
    id: "GenerateSearchQueries",
    description: "Generates relevant search queries based on a given prompt.",
    background: "bg-purple-100",
    border: "border-purple-300",
    textColor: "text-purple-800",
    inputs: [
      {
        name: "Query Prompt",
        type: "EString",
        description: "Description or topic to generate search queries for"
      },
      {
        name: "Max Queries",
        type: "ENumber",
        description: "Maximum number of queries to generate",
        optional: true
      }
    ],
    outputs: [
      {
        name: "Queries",
        type: "EList<EString>",
        description: "List of generated search queries"
      }
    ]
  },
  "LanguageTranslate": {
    id: "LanguageTranslate",
    description: "Translates text from one language to another.",
    background: "bg-purple-100",
    border: "border-purple-300",
    textColor: "text-purple-800",
    inputs: [
      {
        name: "Text to Translate",
        type: "EString",
        description: "Text or phrase that needs to be translated"
      },
      {
        name: "Target Language",
        type: "EString",
        description: "Language code or name to translate into"
      }
    ],
    outputs: [
      {
        name: "Translated Text",
        type: "EString",
        description: "Result of the translation process"
      }
    ]
  },
  "GenerateText": {
    id: "GenerateText",
    description: "Generates text based on a given prompt or context.",
    background: "bg-purple-100",
    border: "border-purple-300",
    textColor: "text-purple-800",
    inputs: [
      {
        name: "Prompt",
        type: "EString",
        description: "Prompt or context to guide text generation"
      },
      {
        name: "Max Length",
        type: "ENumber",
        description: "Maximum length (in characters or tokens)",
        optional: true
      }
    ],
    outputs: [
      {
        name: "Generated Text",
        type: "EString",
        description: "The text generated by the module"
      }
    ]
  },
  "GenerateImage": {
    id: "GenerateImage",
    description: "Generates an image based on a prompt or description.",
    background: "bg-purple-100",
    border: "border-purple-300",
    textColor: "text-purple-800",
    inputs: [
      {
        name: "Description",
        type: "EString",
        description: "Brief description or prompt for image creation"
      },
      {
        name: "Width",
        type: "ENumber",
        description: "Image width in pixels",
        optional: true
      },
      {
        name: "Height",
        type: "ENumber",
        description: "Image height in pixels",
        optional: true
      }
    ],
    outputs: [
      {
        name: "Image URL",
        type: "EString",
        description: "URL or file path to the generated image"
      }
    ]
  },
  "FormatAsHTML": {
    id: "FormatAsHTML",
    description: "Converts plain text into HTML format.",
    background: "bg-purple-100",
    border: "border-purple-300",
    textColor: "text-purple-800",
    inputs: [
      {
        name: "Raw Text",
        type: "EString",
        description: "Plain text to convert into HTML format"
      }
    ],
    outputs: [
      {
        name: "HTML",
        type: "EString",
        description: "Formatted HTML content"
      }
    ]
  },
  "FormatAsMarkdown": {
    id: "FormatAsMarkdown",
    description: "Converts plain text into Markdown format.",
    background: "bg-purple-100",
    border: "border-purple-300",
    textColor: "text-purple-800",
    inputs: [
      {
        name: "Raw Text",
        type: "EString",
        description: "Plain text to convert into Markdown format"
      }
    ],
    outputs: [
      {
        name: "Markdown",
        type: "EString",
        description: "Formatted Markdown content"
      }
    ]
  },
  "ExtractFields": {
    id: "ExtractFields",
    description: "Extracts specific fields from a given text using a predefined schema.",
    background: "bg-purple-100",
    border: "border-purple-300",
    textColor: "text-purple-800",
    inputs: [
      {
        name: "Source Text",
        type: "EString",
        description: "Text from which fields will be extracted"
      },
      {
        name: "Schema Definition",
        type: "EString",
        description: "Rules or structure describing which fields to extract"
      }
    ],
    outputs: [
      {
        name: "Extracted Fields",
        type: "EJson",
        description: "Key-value pairs representing the extracted fields"
      }
    ]
  },
  "ExtractText": {
    id: "ExtractText",
    description: "Extracts the main body of text from HTML or raw text input.",
    background: "bg-purple-100",
    border: "border-purple-300",
    textColor: "text-purple-800",
    inputs: [
      {
        name: "Source",
        type: "EString",
        description: "HTML or raw text to extract the main body from"
      }
    ],
    outputs: [
      {
        name: "Clean Text",
        type: "EString",
        description: "Text content after extraction and cleanup"
      }
    ]
  },
  "SpeakText": {
    id: "SpeakText",
    description: "Converts text into speech audio.",
    background: "bg-purple-100",
    border: "border-purple-300",
    textColor: "text-purple-800",
    inputs: [
      {
        name: "Text to Speak",
        type: "EString",
        description: "The text you want converted into speech"
      },
      {
        name: "Voice",
        type: "EString",
        description: "Voice profile or accent (optional)",
        optional: true
      }
    ],
    outputs: [
      {
        name: "Audio URL",
        type: "EString",
        description: "URL or file path to the generated speech audio"
      }
    ]
  }
};

// 2) packages array with color props removed for Time & Math, but kept “as is” for the others
const packages = [
  {
    id: 1,
    name: "Time",
    modules: [
      "Timeout",
      "Schedule",
    ]
  },
  {
    id: 2,
    name: "Math",
    modules: [
      "Add",
      "Subtract",
      "Multiply",
      "Divide",
      "SQLOperation",
      "RunCodeSnippet",
      "InvokeWolframAlpha",
    ]
  },
  {
    id: 3,
    name: "AI",
    modules: [
      "GenerateSearchQueries",
      "LanguageTranslate",
      "GenerateText",
      "GenerateImage",
      "FormatAsHTML",
      "FormatAsMarkdown",
      "ExtractFields",
      "ExtractText",
      "SpeakText",
    ]
  },
  {
    id: 4,
    name: "Structure",
    modules: [
      "If-Else",
      "Loop",
      "Switch",
    ]
  },
  {
    id: 5,
    name: "Web",
    modules: [
      "HTTPRequest",
      "GetSiteContent",
      "GoogleSearch",
    ]
  },
  {
    id: 6,
    name: "Files",
    modules: [
      "CSVToTable",
      "TableToCSV",
      "TableToJSON",
      "JSONToTable",
    ]
  },
  {
    id: 7,
    name: "Table Operations",
    modules: [
      "FilterTable",
      "SortTable",
      "GroupTable",
      "JoinTables",
    ]
  }
];

const Sidebar = () => {
  return (
    <aside className="absolute top-32 right-8 w-[20%] rounded-md bg-neutral-800 shadow-lg p-4 border-2 border-orange-500 sm:hidden">
      <h2 className="font-semibold mb-2 text-orange-500 text-xl">Packages</h2>
      <nav>
        <ul className="space-y-2">
          {packages.map((pkg, idx) => (
            <li key={pkg.id}>
              <a href={`#group${pkg.id}`} className="text-blue-600 hover:underline">
                {pkg.name}
              </a>
              {pkg.modules.map((module, idx) => (
                <p>
                  <a href={`#mod${idx}`} className="text-blue-600 hover:underline pl-5">
                    {module}
                  </a>
                </p>
              ))}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};


class Module extends React.Component<{
  moduleName: string, 
  onClick: () => void}
>{
  
  render() {
    const { moduleName, onClick } = this.props;
    const moduleIO = modulesIO[moduleName];
    if (!moduleIO) return null;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        key={moduleName}
        layoutId={`moduleContainer${moduleName}`}
        onClick={onClick}
        className={
          "w-auto w-40 sm:h-24 md:h-24 lg:h-24 border-2 text-black rounded-lg text-2xl sm:text-sm px-3 pt-2 break-all text-pretty " +
          moduleIO.background +
          " " +
          moduleIO.border +
          " " +
          moduleIO.textColor
        }
      >
        <motion.h3 layoutId={`moduleHeading${moduleName}`} className="font-semibold pr-10">{moduleName}</motion.h3>
        <motion.p layoutId={`moduleDesc${moduleName}`} className="text-sm font-normal ">{moduleIO.description}</motion.p>
        {/* Dot Rendering */}
        <div className="relative bottom-0 w-full flex justify-between px-1">
          <span key={1} className="bg-white rounded-full w-2 h-2"></span>
        </div>
      </motion.div>
    );
  }
}

const offering = {
  id: 1,
  title: "Purpose-built for product development",
  description:
    "Linear was developed with a specific purpose: to empower product teams to do their best work. Every aspect is intentionally designed to help teams focus on what they do best: Planning, building, and shipping great products. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien. Excepteur veniam non cupidatat tempor ullamco est consectetur deserunt nisi mollit aute proident ad anim.Quis consequat reprehenderit cillum laboris occaecat et non. Incididunt minim do exercitation sunt dolore culpa anim enim laboris ullamco pariatur aliquip do. Tempor elit duis cupidatat cupidatat ut consectetur irure. Velit proident duis pariatur aliquip amet Lorem magna qui ut Commodo sint pariatur id reprehenderit adipisicing incididunt ea exercitation dolor dolor sint culpa. Cupidatat anim veniam cillum sunt reprehenderit Lorem ipsum do tempor qui et ex irure sint. Non excepteur quis est do. Ullamco velit occaecat proident non in dolor amet.",
  banner:
    "https://linear.app/cdn-cgi/imagedelivery/fO02fVwohEs9s9UHFwon6A/fc435ee2-fabf-4f10-5a37-d89874f4bf00/f=auto,dpr=2,q=95,fit=scale-down,metadata=none",
}

const Modal = (props: {moduleName: any | null, onClick: () => void}) => {
  return  (
    <>
      <AnimatePresence>
        {!!props.moduleName && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-10"
            initial={{ backdropFilter: "blur(0px)" }}
            animate={{ backdropFilter: "blur(10px)" }}
            exit={{ backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {!!props.moduleName && (
          <motion.div
            className={"fixed z-10 flex flex-col justify-center items-center inset-0 bg-opacity-50 bg-black"}
            onClick={props.onClick}
          >
            <motion.div
              className={"p-8 w-[64%] mx-auto h-[96vh] rounded-[30px] relative overflow-y-auto border-2 " + modulesIO[props.moduleName].background + " " + modulesIO[props.moduleName].border}
              layoutId={`moduleContainer${props.moduleName}`}
            >
                <motion.p
                  className={"text-[56px] leading-[60px] " + modulesIO[props.moduleName].textColor}
                  layoutId={`moduleHeading${props.moduleName}`}
                >
                  {props.moduleName}
                </motion.p>
                <motion.p
                  className={"mt-8 " + modulesIO[props.moduleName].textColor}
                  layoutId={`moduleDesc${props.moduleName}`}
                >
                  {modulesIO[props.moduleName].description}
                </motion.p>
            </motion.div>
          </motion.div>
      )}
      </AnimatePresence>
    </>
  );
}


const ModulesIndex = () => {
  const [user, setUser] = useState(null);
  const [packs, setPacks] = useState(packages);
  const [moduleSelected, setModuleSelected] = useState<string | null>(null);

  useEffect(() => {
    fetchUser(setUser);
  }, []);

  return (
    <main className="min-h-screen flex flex-col bg-black w-full">
      {/* <CitedContentDisplay/> */}
      {/* <div className="w-full flex justify-center md:pl-48 ">
        <Navbar user={user} />
      </div>
      <div className="flex flex-col md:flex-row w-full">
        <Sidebar />
        <div className="md:ml-48 p-4 w-full min-h-screen center-div mx-auto">
          <GoogleSearch />
          <section
            id="section2"
            className="h-screen bg-orange-500 mb-4 rounded p-4 pb-20"
          >
            Module 2
          </section>
        </div>
      </div> */}
    </main>
  );
};

export default ModulesIndex;
