// Sample blog posts data
let posts = [
  {
    id: '1',
    title: 'The Future of Web Development in 2024',
    summary: 'Exploring the latest trends and technologies that are shaping the future of web development, from AI integration to advanced frameworks.',
    content: `Web development is evolving at an unprecedented pace, and 2024 brings exciting new possibilities. From AI-powered development tools to advanced frameworks, the landscape is changing rapidly.

One of the most significant trends is the integration of artificial intelligence into development workflows. AI assistants can now help with code generation, debugging, and even project planning. This doesn't mean developers will be replaced, but rather that they'll be able to focus on more creative and complex problem-solving tasks.

Another major development is the rise of WebAssembly (WASM), which allows high-performance applications to run in the browser. This technology is enabling complex applications like video editors and 3D modeling tools to work seamlessly in web browsers.

The React ecosystem continues to grow with new features like concurrent rendering and automatic batching. These improvements make React applications faster and more responsive, especially on lower-end devices.

TypeScript adoption is also on the rise, with more teams recognizing the benefits of static typing for large-scale applications. The improved developer experience and better error catching make it an essential tool for modern web development.

Looking ahead, we can expect to see more emphasis on performance optimization, accessibility, and user experience. The web is becoming more powerful, and developers have more tools than ever to create amazing experiences.`,
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
    mediaVersions: [
      {
        id: 'Prompt',
        label: 'Prompt',
        url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
        type: 'image',
        content: `# Web Development Blog Post Prompt

## Task
Write a comprehensive blog post about the future of web development in 2024.

## Requirements
- Target audience: Web developers and tech enthusiasts
- Length: 800-1200 words
- Tone: Professional but accessible
- Include current trends and future predictions

## Key Points to Cover
1. **AI Integration in Development**
   - AI-powered code generation tools
   - Automated debugging and testing
   - Impact on developer productivity
   - Future implications for the industry

2. **WebAssembly (WASM) Revolution**
   - High-performance web applications
   - Use cases: video editors, 3D modeling, games
   - Browser compatibility and adoption
   - Performance benefits over JavaScript

3. **React Ecosystem Evolution**
   - Concurrent rendering features
   - Automatic batching improvements
   - Performance optimizations
   - Developer experience enhancements

4. **TypeScript Adoption**
   - Benefits of static typing
   - Large-scale application development
   - Improved developer experience
   - Error prevention and code quality

5. **Future Trends**
   - Performance optimization focus
   - Accessibility improvements
   - User experience enhancements
   - Emerging web technologies

## Writing Guidelines
- Use clear, engaging language
- Include specific examples and use cases
- Maintain a forward-looking perspective
- Balance technical depth with accessibility
- End with actionable insights for developers

## SEO Considerations
- Include relevant keywords naturally
- Use proper heading structure
- Add meta descriptions
- Optimize for search intent

## Call to Action
- Encourage reader engagement
- Suggest further reading
- Invite comments and discussion
- Promote related content

---
*This prompt is designed to generate high-quality, comprehensive content about web development trends and future predictions.*`,
        isPrompt: true
      },
      {
        id: 'A',
        label: 'Original',
        url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
        type: 'image',
        content: `Web development is evolving at an unprecedented pace, and 2024 brings exciting new possibilities. From AI-powered development tools to advanced frameworks, the landscape is changing rapidly.

One of the most significant trends is the integration of artificial intelligence into development workflows. AI assistants can now help with code generation, debugging, and even project planning. This doesn't mean developers will be replaced, but rather that they'll be able to focus on more creative and complex problem-solving tasks.

Another major development is the rise of WebAssembly (WASM), which allows high-performance applications to run in the browser. This technology is enabling complex applications like video editors and 3D modeling tools to work seamlessly in web browsers.

The React ecosystem continues to grow with new features like concurrent rendering and automatic batching. These improvements make React applications faster and more responsive, especially on lower-end devices.

TypeScript adoption is also on the rise, with more teams recognizing the benefits of static typing for large-scale applications. The improved developer experience and better error catching make it an essential tool for modern web development.

Looking ahead, we can expect to see more emphasis on performance optimization, accessibility, and user experience. The web is becoming more powerful, and developers have more tools than ever to create amazing experiences.`
      },
      {
        id: 'B', 
        label: 'Dark Theme',
        url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop&sat=-50&brightness=0.3',
        type: 'image',
        content: `**Dark Theme Perspective on Web Development**

The dark theme trend in web development reflects a broader shift towards user-centric design. Dark interfaces reduce eye strain, especially during extended coding sessions, and have become the preferred choice for many developers.

From a technical standpoint, implementing dark themes requires careful consideration of color contrast, accessibility standards, and user preferences. Modern CSS custom properties and design systems make it easier than ever to create cohesive dark experiences.

The psychological impact of dark themes extends beyond aesthetics. Studies show that dark interfaces can improve focus and reduce visual fatigue, making them particularly valuable for development environments and content consumption.

As we move forward, the integration of dark themes with system preferences and user choice will become increasingly important. The future of web development isn't just about functionality—it's about creating experiences that adapt to user needs and preferences.`
      },
      {
        id: 'C',
        label: 'Mobile View',
        url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=600&fit=crop',
        type: 'image',
        content: `**Mobile-First Web Development**

The mobile revolution has fundamentally changed how we approach web development. With over 60% of web traffic coming from mobile devices, mobile-first design is no longer optional—it's essential.

Progressive Web Apps (PWAs) are bridging the gap between native and web experiences, offering offline functionality, push notifications, and app-like performance. This technology is particularly powerful for mobile users who expect seamless, fast experiences.

Responsive design has evolved beyond simple breakpoints. Modern approaches include container queries, fluid typography, and adaptive layouts that respond to user context and device capabilities.

The mobile development landscape is also being shaped by new frameworks and tools specifically designed for mobile performance. From optimized bundling to advanced caching strategies, the focus is on delivering exceptional mobile experiences.

As we look to the future, the line between web and native will continue to blur, with web technologies becoming increasingly capable of delivering native-quality experiences on mobile devices.`
      }
    ],
    date: '2024-01-15T10:00:00Z',
    category: 'Technology',
    isFeatured: true,
  },
  {
    id: '2',
    title: '10 Productivity Hacks for Remote Workers',
    summary: 'Discover proven strategies to boost your productivity while working from home, from time management to workspace optimization.',
    content: `Working remotely has become the new normal for many professionals, but it comes with unique challenges. Here are ten proven strategies to maximize your productivity when working from home.

First, establish a dedicated workspace. Even if you don't have a separate room, create a specific area for work. This helps your brain switch into "work mode" and maintains boundaries between work and personal life.

Time blocking is essential for remote productivity. Schedule specific blocks of time for different tasks and stick to them. This prevents context switching and helps you focus on one thing at a time.

Take regular breaks using the Pomodoro Technique: work for 25 minutes, then take a 5-minute break. This keeps your mind fresh and prevents burnout.

Use technology to your advantage. Project management tools like Notion, Trello, or Asana help you stay organized. Communication tools like Slack or Microsoft Teams keep you connected with your team.

Set clear boundaries with family and roommates. Let them know your work hours and when you shouldn't be disturbed. This is crucial for maintaining focus.

Dress for success, even at home. While you don't need to wear a suit, changing out of pajamas helps signal that it's time to work.

Stay connected with your team through regular check-ins and virtual coffee chats. Social interaction is important for mental health and team cohesion.

Track your productivity patterns. Notice when you're most alert and schedule your most important tasks during those times.

Finally, don't forget to move. Take short walks, stretch, or do quick exercises throughout the day to maintain energy levels.`,
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
    mediaVersions: [
      {
        id: 'A',
        label: 'Workspace',
        url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
        type: 'image'
      },
      {
        id: 'B',
        label: 'Team Meeting',
        url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&brightness=1.2',
        type: 'image'
      }
    ],
    date: '2024-01-10T14:30:00Z',
    category: 'Productivity',
    isFeatured: false,
  },
  {
    id: '3',
    title: 'Healthy Meal Prep for Busy Professionals',
    summary: 'Learn how to prepare nutritious, delicious meals in advance to save time and maintain a healthy diet during busy work weeks.',
    content: `Meal prepping is a game-changer for busy professionals who want to eat healthily without spending hours in the kitchen every day. Here's how to get started with effective meal preparation.

Start by planning your meals for the week. Choose recipes that are easy to batch cook and store well. Focus on proteins like chicken, fish, or tofu, along with complex carbohydrates and plenty of vegetables.

Invest in good storage containers. Glass containers are ideal as they're microwave-safe, don't absorb odors, and are environmentally friendly. Having containers in different sizes helps with portion control.

Cook in batches on weekends or your day off. Prepare large quantities of grains like quinoa, brown rice, or sweet potatoes. Roast vegetables in bulk - they keep well and can be used in various dishes throughout the week.

Protein is crucial for maintaining energy levels. Grill or bake chicken breasts, cook lentils, or prepare hard-boiled eggs. These can be easily added to salads, wraps, or grain bowls.

Don't forget about snacks. Prepare healthy options like cut vegetables with hummus, mixed nuts, or Greek yogurt with berries. Having these ready prevents reaching for unhealthy alternatives.

Use versatile ingredients that can be mixed and matched. For example, roasted vegetables can be used in salads, wraps, or as side dishes. Cooked quinoa can be used in breakfast bowls, salads, or as a base for stir-fries.

Season your food well during preparation. This ensures your meals are flavorful even after reheating. Consider using herbs, spices, and healthy sauces to add variety.

Store your prepped meals properly. Most cooked foods last 3-5 days in the refrigerator. Freeze portions for longer storage, especially for soups and stews.

Remember to include variety in your meal prep to prevent boredom. Rotate between different cuisines and flavors to keep things interesting.`,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop',
    date: '2024-01-08T09:15:00Z',
    category: 'Food',
    isFeatured: false,
  },
  {
    id: '4',
    title: 'The Art of Mindful Living in a Digital Age',
    summary: 'Explore practical ways to incorporate mindfulness into your daily routine while navigating the constant distractions of modern technology.',
    content: `In our hyperconnected world, finding moments of peace and presence can feel like an impossible task. However, mindful living is not about escaping technology but learning to use it intentionally.

Start your day with intention. Instead of immediately checking your phone, take five minutes to sit quietly, breathe deeply, and set your intentions for the day. This simple practice can transform your entire day.

Practice digital mindfulness by being intentional about your technology use. Set specific times to check emails and social media, rather than constantly refreshing throughout the day. Consider using apps that track your screen time to become more aware of your habits.

Incorporate mindfulness into everyday activities. When you're eating, focus on the taste, texture, and smell of your food. When you're walking, notice the sensation of your feet touching the ground and the air on your skin.

Use technology to support your mindfulness practice. Meditation apps like Headspace or Calm can guide you through sessions, while apps like Forest help you stay focused by growing virtual trees when you avoid your phone.

Create tech-free zones in your home. Designate certain areas, like your bedroom or dining table, as phone-free zones. This helps create boundaries and allows for more meaningful connections with family and friends.

Practice gratitude daily. Take a few minutes each day to write down three things you're grateful for. This simple practice has been shown to improve mental health and overall well-being.

Learn to say no to digital distractions. When you're working on important tasks, turn off notifications and put your phone in another room. This allows you to focus deeply and be more productive.

Remember that mindfulness is a skill that takes practice. Start with small, manageable changes and gradually build up to longer practices. Even a few minutes of mindful breathing each day can make a significant difference in your overall well-being.`,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    date: '2024-01-05T16:45:00Z',
    category: 'Lifestyle',
    isFeatured: false,
  },
  {
    id: '5',
    title: 'Building a Sustainable Morning Routine',
    summary: 'Create a morning routine that sets you up for success while being realistic and sustainable for long-term health and productivity.',
    content: `A good morning routine can set the tone for your entire day, but it needs to be sustainable to be effective. Here's how to build a morning routine that works for you and sticks.

Start by identifying your priorities. What's most important to you? Is it exercise, meditation, reading, or spending time with family? Your morning routine should reflect these values.

Begin small and build gradually. Don't try to implement a two-hour routine overnight. Start with just 10-15 minutes and add activities as they become habits. This prevents overwhelm and increases the likelihood of success.

Prepare the night before. Lay out your clothes, pack your lunch, and set up your workspace. This reduces decision fatigue in the morning and makes it easier to get started.

Wake up at the same time every day, even on weekends. This helps regulate your circadian rhythm and makes it easier to wake up naturally. Consistency is key for building sustainable habits.

Start with something you enjoy. If you love coffee, make that your first activity. If you enjoy reading, start your day with a few pages of a good book. This creates positive associations with your morning routine.

Include movement in your morning. This doesn't have to be an intense workout - even a short walk or some gentle stretching can boost your energy and mood for the day ahead.

Practice gratitude or journaling. Taking a few minutes to reflect on what you're grateful for or to write down your thoughts can improve your mental health and set a positive tone for the day.

Be flexible and forgiving. Some mornings won't go as planned, and that's okay. Don't let one bad morning derail your entire routine. Just start again the next day.

Remember that your morning routine should serve you, not the other way around. If something isn't working, feel free to adjust or remove it. The goal is to create a routine that enhances your life, not adds stress.`,
    image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&h=600&fit=crop',
    date: '2024-01-03T07:20:00Z',
    category: 'Health',
    isFeatured: false,
  },
  {
    id: '6',
    title: 'React Tutorial: Building Your First App',
    summary: 'A comprehensive guide to building your first React application, from setup to deployment.',
    content: `React has become one of the most popular JavaScript libraries for building user interfaces. In this tutorial, we'll walk through building your first React application from scratch.

First, let's set up our development environment. You'll need Node.js installed on your computer. Once that's done, we can create a new React project using Create React App.

The key concepts in React are components, props, and state. Components are reusable pieces of UI that can accept props (properties) and manage their own state. Understanding these concepts is crucial for building React applications.

JSX is React's syntax extension that allows you to write HTML-like code in JavaScript. It makes your components more readable and easier to understand.

State management is essential in React applications. For simple applications, you can use React's built-in useState hook. For more complex applications, you might want to consider Context API or external state management libraries.

Event handling in React is straightforward. You can attach event handlers to elements using camelCase event names like onClick, onChange, and onSubmit.

Conditional rendering allows you to show different content based on certain conditions. You can use if statements, ternary operators, or logical && operators to conditionally render components.

Lists and keys are important concepts in React. When rendering lists of elements, you need to provide a unique key prop to help React efficiently update the DOM.

Finally, we'll cover deployment options for your React application. You can deploy to platforms like Netlify, Vercel, or GitHub Pages with just a few clicks.

This tutorial provides a solid foundation for building React applications. Practice these concepts and you'll be well on your way to becoming a React developer.`,
    image: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    date: '2024-01-20T12:00:00Z',
    category: 'Development',
    isFeatured: false,
  },
];

// Function to get the featured post (most recent post marked as featured)
export const getFeaturedPost = () => {
  const featuredPosts = posts.filter(post => post.isFeatured);
  if (featuredPosts.length > 0) {
    return featuredPosts[0];
  }
  // If no featured post, return the most recent post
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
};

// Function to get historical posts (all posts except the featured one)
export const getHistoricalPosts = () => {
  const featuredPost = getFeaturedPost();
  return posts
    .filter(post => post.id !== featuredPost.id)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
};

// Function to add a new post
export const addPost = (newPost) => {
  const post = {
    ...newPost,
    id: Date.now().toString(),
    date: new Date().toISOString(),
  };
  
  // Add to the beginning of the array (most recent first)
  posts.unshift(post);
  
  // If this is marked as featured, unmark all others
  if (post.isFeatured) {
    posts.forEach(p => {
      if (p.id !== post.id) {
        p.isFeatured = false;
      }
    });
  }
  
  return post;
};

// Function to get all posts
export const getAllPosts = () => {
  return [...posts];
};

// Function to get posts by category
export const getPostsByCategory = (category) => {
  return posts.filter(post => 
    post.category.toLowerCase() === category.toLowerCase()
  );
};

// Function to search posts
export const searchPosts = (query) => {
  const searchTerm = query.toLowerCase();
  return posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm) ||
    post.summary.toLowerCase().includes(searchTerm) ||
    post.content.toLowerCase().includes(searchTerm) ||
    post.category.toLowerCase().includes(searchTerm)
  );
};

export { posts };

