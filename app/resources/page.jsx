"use client";

import React, { useState } from 'react';
import Navbar from '@/components/common/Navbar';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const guides = [
	{
		type: 'BeachCleanupGuide',
		heading: 'Beach Cleanup Guide',
		sections: [
			{ title: "Preparation", text: "Identify polluted beaches, gather volunteers, get permission from local authorities, and arrange cleaning tools like gloves, bags, and bins." },
			{ title: "Safety Measures", text: "Ensure volunteers wear gloves and closed shoes, provide first aid kits, and stay hydrated throughout the event." },
			{ title: "Cleanup Process", text: "Start from one end, collect segregated waste (plastic, metal, glass, etc.), and dispose of it responsibly in bins or recycling centers." },
			{ title: "After Cleanup", text: "Celebrate and appreciate volunteers, post impact stats on social media, and share learnings for future drives." }
		]
	},
	{
		type: 'TreePlantationGuide',
		heading: 'Tree Plantation Guide',
		sections: [
			{ title: "Preparation", text: "Choose native tree species, prepare land, gather saplings, spades, watering cans, and protective gear." },
			{ title: "Safety Measures", text: "Educate about proper lifting, digging depth, and avoid harsh tools for children participants." },
			{ title: "Plantation Process", text: "Dig appropriate pits, plant saplings, water them, and apply compost or mulch around the base." },
			{ title: "Care and Maintenance", text: "Assign groups to maintain plants for the next 6–12 months with regular watering and protection." }
		]
	},
	{
		type: 'WasteManagementGuide',
		heading: 'Waste Management Guide',
		sections: [
			{ title: "Understanding Waste", text: "Learn to differentiate between biodegradable, non-biodegradable, and hazardous waste." },
			{ title: "Segregation", text: "Use color-coded bins: green for wet, blue for dry, red for hazardous. Educate communities." },
			{ title: "Composting", text: "Encourage home/community composting using kitchen waste for soil enrichment." },
			{ title: "Recycling", text: "Partner with recyclers for paper, plastic, metal, and glass. Avoid sending recyclables to landfills." }
		]
	},
	{
		type: 'EWasteGuide',
		heading: 'E-Waste Disposal Guide',
		sections: [
			{ title: "Awareness", text: "Understand the harm caused by improper disposal of electronic waste." },
			{ title: "Collection Drives", text: "Organize e-waste collection camps for households, offices, and schools." },
			{ title: "Safe Disposal", text: "Tie up with government-authorized recyclers for dismantling and proper disposal." },
			{ title: "Upcycling", text: "Promote reuse or donation of functional electronics to schools or NGOs." }
		]
	},
	{
		type: 'WaterConservationGuide',
		heading: 'Water Conservation Guide',
		sections: [
			{ title: "Assessment", text: "Evaluate local water usage, leakages, and opportunities to save water." },
			{ title: "Techniques", text: "Install aerators, use rainwater harvesting, and promote drip irrigation for plants." },
			{ title: "Community Action", text: "Organize workshops, water audits, and awareness drives for responsible use." },
			{ title: "Long-Term Strategy", text: "Collaborate with authorities to restore water bodies and push sustainable policies." }
		]
	}
];

const ResourceDetailPage = () => {
	const [activeTab, setActiveTab] = useState(0);

	return (
		<div className="min-h-screen bg-gradient-to-br from-[#01d3b2] via-yellow-400 to-yellow-300">
			<Navbar />
      <div className="container mx-auto px-2 sm:px-4 lg:px-8 py-8 sm:py-12"></div>
			<div className="container mx-auto px-2 sm:px-4 lg:px-8 py-8 sm:py-12">
				<h1 className="text-2xl sm:text-4xl font-bold text-white mb-2 text-center">Environmental Guides</h1>
				<p className="text-white mb-6 text-base sm:text-lg text-center">Comprehensive guides on sustainable environmental activities.</p>

				<div className="bg-white bg-opacity-20 backdrop-blur-md rounded-xl p-2 sm:p-6 shadow-lg">
					<Tabs selectedIndex={activeTab} onSelect={(index) => setActiveTab(index)}>
						<div className="bg-white/30 backdrop-blur-md rounded-lg shadow p-2 sm:p-4">
							{/* Tab Headers */}
							<TabList className="flex flex-wrap gap-2 sm:gap-4 border-b mb-4">
								{guides.map((guide, index) => (
									<Tab
										key={index}
										className="cursor-pointer px-2 py-1 sm:px-4 sm:py-2 rounded-t-md bg-white/60 hover:bg-white font-medium text-xs sm:text-base"
									>
										{guide.heading}
									</Tab>
								))}
							</TabList>

							{/* Tab Panels */}
							{guides.map((guide, index) => (
								<TabPanel key={index}>
									<div>
										<h2 className="text-lg sm:text-2xl font-bold mb-4 text-center">{guide.heading}</h2>
										<div className="grid gap-4 sm:gap-6">
											{guide.sections.map((section, sectionIndex) => (
												<div
													key={sectionIndex}
													className="bg-white bg-opacity-60 backdrop-blur-lg p-3 sm:p-6 rounded-lg shadow-md mb-2 sm:mb-6"
												>
													<h3 className="text-base sm:text-xl font-semibold mb-2">{section.title}</h3>
													<p className="text-sm sm:text-base">{section.text}</p>
												</div>
											))}
										</div>
									</div>
								</TabPanel>
							))}
						</div>
					</Tabs>
				</div>
			</div>
		</div>
	);
};

export default ResourceDetailPage;