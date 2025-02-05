import Footer from '@/components/landing-page/Footer';
import Navbar from '@/components/landing-page/Navbar';
import { fetchUser } from '@/utils/fetches';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const Blog = () => {
    const [user, setUser] = useState(null);
    // const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchUser(setUser);
        // fetchPosts(setPosts);
    }, []);

    return (
        <main className="min-h-screen flex flex-col items-center grid-lines bg-black">
            <Navbar user={user} />
            {/* Blog Content */}
            <section className="container mx-auto px-4 md:px-8 py-10 md:py-16 bg-black mt-8 mb-16 rounded-xl border-2 border-orange-500 sm:px-8">
                <h1 className="text-3xl md:text-5xl font-bold text-white pb-4">
                    How Are Businesses Using AI to Grow?
                </h1>
                {/* Publication Info */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 text-gray-500 text-sm">
                    <p>Published 12/04/2024</p>
                    {/* Add more metadata if desired (e.g., author, reading time, etc.) */}
                </div>

                {/* Main Text Content */}
                <div className="leading-relaxed space-y-6 font-light">
                    <p>
                        Businesses are turning to artificial intelligence (AI) to save time, reduce costs,
                        and improve overall performance. AI helps automate routine tasks, analyze large
                        amounts of data quickly, and make more informed decisions. This technology enables
                        companies to operate more efficiently, offer personalised services, and stay ahead
                        of the competition, all while cutting costs and saving valuable time.
                    </p>

                    <h2 className="text-xl md:text-2xl font-semibold mt-8">Recent Statistics</h2>
                    <ul className="list-disc list-inside pl-2 space-y-2">
                        <li>
                            <strong>AI Adoption:</strong> According to a 2023 survey by McKinsey, 50% of companies
                            report using AI in at least one business function, up from 20% in 2017.
                        </li>
                        <li>
                            <strong>Efficiency Gains:</strong> A study by PwC indicates that businesses implementing
                            AI see productivity improvements of up to 40%.
                        </li>
                        <li>
                            <strong>Cost Reduction:</strong> The International Data Corporation (IDC) projects that
                            AI will help businesses save over $1 trillion by 2030 through enhanced operational
                            efficiencies.
                        </li>
                    </ul>

                    <h2 className="text-xl md:text-2xl font-semibold mt-8">
                        Top Ways Businesses Use Artificial Intelligence
                    </h2>
                    <div className="overflow-x-auto mt-4">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-black-100 border-b-2 border-gray-200">
                                    <th className="px-4 py-2 font-semibold">Use Case</th>
                                    <th className="px-4 py-2 font-semibold">Percentage</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-200">
                                    <td className="px-4 py-2">Customer service</td>
                                    <td className="px-4 py-2">56%</td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="px-4 py-2">Cybersecurity / Fraud management</td>
                                    <td className="px-4 py-2">51%</td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="px-4 py-2">Digital personal assistants</td>
                                    <td className="px-4 py-2">47%</td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="px-4 py-2">Customer relationship management</td>
                                    <td className="px-4 py-2">46%</td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="px-4 py-2">Inventory management</td>
                                    <td className="px-4 py-2">40%</td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="px-4 py-2">Content production</td>
                                    <td className="px-4 py-2">35%</td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="px-4 py-2">Product recommendations</td>
                                    <td className="px-4 py-2">33%</td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="px-4 py-2">Accounting</td>
                                    <td className="px-4 py-2">30%</td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="px-4 py-2">Supply chain operations</td>
                                    <td className="px-4 py-2">30%</td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="px-4 py-2">Recruitment and talent sourcing</td>
                                    <td className="px-4 py-2">26%</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2">Audience segmentation</td>
                                    <td className="px-4 py-2">24%</td>
                                </tr>
                            </tbody>
                        </table>
                        <p className="mt-2 text-gray-400">
                            Source:{' '}
                            <a
                                href="https://www.forbes.com/advisor/business/software/ai-in-business/#how_businesses_are_using_artificial_intelligence_section"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline text-orange-500"
                            >
                                <strong>Forbes</strong>
                            </a>
                        </p>
                    </div>
                    <div className="w-full mt-10">
                        <Image 
                            src="/adoption_by_region.png" 
                            alt="A description" 
                            width={500} 
                            height={300}
                        />
                        <p className="mt-2 text-xs text-gray-400 italic">
                        Source:{' '}
                            <a
                                href="https://explodingtopics.com/blog/companies-using-ai"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline text-orange-500"
                            >
                                <strong>Exploding Topics</strong>
                            </a>
                        </p>
                    </div>

                    {/* 1. Customer Service */}
                    <h2 className="text-xl md:text-2xl font-semibold mt-10">
                        1. Customer Service
                    </h2>
                    <p>
                        AI customer service is like having a super-smart helper who's always there for you.
                        They can answer your questions quickly, solve problems easily, and even give you
                        personalized suggestions. It’s like having a friend who knows everything and is
                        always ready to help you out.
                    </p>
                    <p>
                        Klarna Bank AB is one good example when it comes to AI powered customer service.
                        It is a Swedish company that offers online financial services. It helps with payment
                        processing for online shopping, letting customers buy now and pay later.
                    </p>
                    <p>
                        Klarna's virtual assistant allegedly equivalent to 700 employees, available
                        round-the-clock to answer your questions, just like a friendly neighbour. Need help
                        with an order at 3 AM? No problem! Their AI is there, working tirelessly to ensure
                        you get the assistance you need, whenever you need it.
                    </p>
                    <p>
                        And it's not just about being available; it's about speed. AI-powered chatbots can
                        understand and respond to your inquiries almost instantly, no more waiting in line
                        or getting lost in endless phone menus. It’s like having a conversation with a
                        knowledgeable friend who knows exactly what you need.
                    </p>
                    <p>
                        What's truly remarkable is how AI tailors its support to you personally.
                        It remembers your past interactions, preferences, and even your shopping history,
                        offering suggestions and solutions that feel like they were made just for you.
                        It's like having a personal shopper who knows your taste inside and out.
                    </p>

                    <h3 className="text-lg md:text-xl font-semibold mt-6">
                        Benefits of AI-based customer service:
                    </h3>
                    <ul className="list-disc list-inside pl-2 space-y-2">
                        <li>
                            <strong>24/7 Availability:</strong> AI-powered chatbots and virtual assistants
                            can provide instant support around the clock, ensuring customers receive
                            assistance whenever they need it, regardless of time zones or business hours.
                        </li>
                        <li>
                            <strong>Faster Response Times:</strong> AI systems can analyze and respond
                            to customer inquiries almost instantly, eliminating the wait times
                            associated with traditional customer support channels.
                        </li>
                        <li>
                            <strong>Scalability:</strong> AI-based support can handle a large volume of
                            customer inquiries simultaneously, making it a scalable solution for businesses
                            experiencing fluctuations in demand.
                        </li>
                        <li>
                            <strong>Cost-Efficiency:</strong> By automating routine tasks, AI reduces
                            the need for large customer support teams, leading to significant cost
                            savings in the long run.
                        </li>
                        <li>
                            <strong>Personalized Experiences:</strong> AI can analyze customer data
                            and history to provide personalized recommendations, offers, and solutions.
                        </li>
                        <li>
                            <strong>Consistent Support:</strong> AI-powered systems ensure consistent
                            responses and adherence to company policies, eliminating the variability
                            that can occur with human agents.
                        </li>
                        <li>
                            <strong>Improved Self-Service:</strong> AI-powered knowledge bases and FAQ
                            sections empower customers to find answers independently, reducing the
                            workload on support teams.
                        </li>
                        <li>
                            <strong>Data Collection and Analysis:</strong> AI can collect valuable data
                            on customer interactions, providing businesses with insights to improve
                            products and overall experience.
                        </li>
                        <li>
                            <strong>Multilingual Support:</strong> AI-powered tools can be configured
                            to support multiple languages, catering to a global audience.
                        </li>
                        <li>
                            <strong>Enhanced Agent Productivity:</strong> AI can assist human agents by
                            providing relevant information, suggesting responses, and automating routine
                            tasks, allowing them to focus on more complex issues.
                        </li>
                    </ul>

                    {/* 2. Marketing */}
                    <h2 className="text-xl md:text-2xl font-semibold mt-10">
                        2. Marketing
                    </h2>
                    <p>
                        Marketing plays a crucial role in business success by connecting products or
                        services with customers' needs and desires. In today's competitive landscape,
                        effective marketing not only attracts but also retains loyal customers,
                        driving revenue and growth.
                    </p>
                    <p>
                        Artificial Intelligence (AI) is revolutionizing marketing by offering tools and
                        insights that enable businesses to understand customer behavior at a deeper level.
                        AI enhances marketing strategies through personalized recommendations,
                        predictive analytics, and efficient campaign management.
                    </p>
                    <p>
                        Consider Amazon's approach: through AI algorithms, it analyzes customer behavior
                        to recommend products, creating a personalized shopping experience that keeps
                        customers coming back.
                    </p>
                    <p>
                        AI's impact goes beyond recommendations. Companies like Sephora use AI-powered
                        chatbots to provide instant, personalized assistance. These bots guide customers
                        through product choices based on preferences and skin types, enhancing the
                        shopping journey without human intervention.
                    </p>
                    <p>
                        Moreover, AI optimizes marketing campaigns with precision. Google Ads, for instance,
                        utilizes AI to analyze data and deliver ads to the most relevant audience segments
                        at the optimal times. Airbnb takes this further by using AI to alter ad content
                        based on individual travel preferences, maximizing campaign effectiveness.
                    </p>
                    <p>
                        By enabling personalized experiences at scale and predicting consumer trends,
                        AI empowers businesses to engage customers more effectively than ever before.
                        As AI technology evolves, its role in marketing will continue to expand,
                        driving innovation and growth in the digital marketplace.
                    </p>

                    {/* 3. Financial Management */}
                    <h2 className="text-xl md:text-2xl font-semibold mt-10">
                        3. Financial Management
                    </h2>
                    <p>
                        A real-life example of AI in financial management is JPMorgan Chase's use of a
                        Contract Intelligence (COiN) platform. This AI-powered platform reviews commercial
                        loan agreements to extract key data points and clauses in seconds, a task that
                        previously took legal teams thousands of hours to complete manually. By automating
                        this process, JPMorgan Chase has significantly reduced the time and resources
                        needed for loan agreement reviews, allowing employees to focus on more complex
                        tasks and strategic decision-making. This demonstrates how AI can streamline
                        operations, improve efficiency, and ultimately enhance the overall financial
                        management process for businesses.
                    </p>
                    <p>
                        <strong>Taking Care of Boring Stuff:</strong> AI can handle repetitive tasks
                        like entering data, processing invoices, and keeping track of expenses. This frees
                        up your team to focus on more important things like analyzing data and making
                        strategic decisions. It's like having a robot that does all the boring paperwork
                        for you!
                    </p>
                    <p>
                        <strong>Predicting the Future:</strong> By analyzing huge amounts of financial
                        data, AI can spot trends and patterns that humans might miss. This can help
                        businesses predict future financial outcomes, like how much revenue they might
                        make next year. It's like having a fortune teller that can help you plan for
                        the future!
                    </p>
                    <p>
                        <strong>Catching Fraudsters:</strong> AI is great at spotting unusual activity
                        that might be a sign of fraud. It can monitor transactions in real-time and alert
                        you if something seems fishy. It's like having a detective that's always on the
                        lookout for financial crimes!
                    </p>
                    <p>
                        <strong>Managing Risk:</strong> AI can help businesses identify and assess risks,
                        such as the risk of not getting paid back on a loan. This can help businesses
                        make better decisions and avoid financial losses. It's like having a risk
                        management expert on your team!
                    </p>

                    {/* Conclusion */}
                    <h2 className="text-xl md:text-2xl font-semibold mt-10">
                        Conclusion
                    </h2>
                    <p>
                        Artificial Intelligence (AI) is reshaping Businesses by making everyday tasks
                        smoother, faster, and smarter. It cuts through the ordinary, crunches data
                        in real-time, and even spots fraud before it happens, letting businesses focus
                        on big-picture strategies. Imagine the difference AI has made for companies like
                        JPMorgan Chase, where it’s turned hours of manual work into seconds of automated
                        efficiency.
                    </p>
                    <p>
                        The bottom line? Embracing AI isn’t just about keeping up; it’s about setting
                        the pace. For businesses ready to innovate, AI offers a path to greater
                        productivity, personalized customer experiences, and a competitive edge.
                    </p>
                </div>
            </section>
            <Footer />
        </main>
    );
};

export default Blog;