export const testProjects: string[] = [
	"Aboubakr",
	"mohamed",
	  "EcoSaver",
	  "TechNova",
	  "SwiftStack",
	  "NexGen",
	  "BrightForge",
	  "AlphaWave",
	  "FusionX",
	  "ElevateX",
	  "InnoTech",
	  "PowerSphere",
	  "MindPulse",
	  "SmartWorks",
	  "InnovaTech",
	  "ApexCraft",
	  "CoreSync",
	  "AgileStream",
	  "InfiniteSolutions",
	  "VortexTech",
	  "QuantumWorks",
	  "CloudVista",
	  "RapidEdge",
	  "SwiftPulse",
	  "CodeBurst",
	  "FutureSphere",
	  "BluePrint",
	  "PioneerTech",
	  "InnoSphere",
	  "AlphaTech",
	  "TechVista",
	  "DigitalPulse",
	  "VitalSync",
	  "SmartSync",
	  "NexGenWorks",
	  "InnovateX",
	  "TechPulse",
	  "EcoTech",
	  "BrightTech",
	  "MindSync",
	  "InnovateTech",
	  "AgileTech",
	  "InnoCraft",
	  "CodeCraft",
	  "SwiftCraft",
	  "CloudCraft",
	  "FutureCraft",
	  "EcoCraft",
	  "AlphaCraft",
	  "VitalTech",
	  "AgileWorks",
	  "SmartCraft",
	
	];
	
	interface Project {
	  id: number;
	  name: string;
	  href: string;
	  images: string[];
	}
	export const testProjects2: Project[] = [
	  {
		id: 1,
		name: "EcoSaver",
		images: ["/assets/hero.jpg", "/assets/killua.jpg"],
		href: "/",
	  },
	  {
		id: 2,
		name: "TechNova",
		href: "/assets/killua.jpg",
		images: ["/assets/hero.jpg", "/assets/killua.jpg"]
	  },
	  {
		id: 3,
		name: "SwiftStack",
		images: ["/assets/main.jpg","/assets/hero.jpg"],
		href:'/'
	  },
	  {
		id: 4,
		name: "NexGen",
		href: "/",
		images: ["/assets/main.jpg","/assets/hero.jpg"]
	  }
	];
  
	interface Worker {
	  id: number;
	  name: string;
	}
	
	export const workers: Worker[] = [
	  { id: 1, name: "John" },
	  { id: 2, name: "Alice" },
	  { id: 3, name: "Michael" },
	  { id: 4, name: "Emily" },
	  { id: 5, name: "David" },
	  { id: 6, name: "Sophia" },
	  { id: 7, name: "James" },
	  { id: 8, name: "Olivia" },
	  { id: 9, name: "Daniel" },
	  { id: 10, name: "Emma" },
	  { id: 11, name: "Liam" },
	  { id: 12, name: "Isabella" },
	  { id: 13, name: "William" },
	  { id: 14, name: "Ava" },
	  { id: 15, name: "Benjamin" },
	  { id: 16, name: "Mia" },
	  { id: 17, name: "Ethan" },
	  { id: 18, name: "Charlotte" },
	  { id: 19, name: "Alexander" },
	  { id: 20, name: "Amelia" },
	  { id: 21, name: "Aboubakr" },
	  { id: 22, name: "Mohamed" },
	];
	interface workerProp {
		id: number;
		name: string;
		service: string;
		href: string;
		image: string;
	  }
	
	
	  export const data: workerProp[] = [
		{
		  id: 1,
		  name: "EcoSaver",
		  image: "/assets/hero.jpg",
		  href: "/worker",
		  service:"informaticien"
		},
		{
		  id: 2,
		  name: "TechNova",
		  href: "/worker",
		  image: "/assets/hero.jpg",
		  service:"informaticien"
	
		},
		{
		  id: 3,
		  name: "TechNova",
		  href: "/worker",
		  image: "/assets/hero.jpg",
		  service:"informaticien"
	
		},
		{
		  id: 4,
		  name: "TechNova",
		  href: "/worker",
		  image: "/assets/29.jpg",
		  service:"informaticien"
	
		},
		{
		  id: 5,
		  name: "TechNova",
		  href: "/worker",
		  image: "/assets/main.jpg",
		  service:"informaticien"
	
		},
		{
		  id: 6,
		  name: "TechNova",
		  href: "/worker",
		  image: "/assets/worker_.jpg",
		  service:"informaticien"
	
		},
	  ];