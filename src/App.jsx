import { useState } from 'react';
import about from './about.js';
function App() {
  const {
    nickname,
    fullName,
    bio,
    available,
    contact,
    skills,
    projects,
    employments,
  } = about;

  return <>
    <div class="container mx-auto max-w-4xl">
    
      {/* Hero */}
      <div className="hero rounded-b-4xl bg-[url(https://picsum.photos/800/320)]">
        <div className="hero-content w-full rounded-b-4xl bg-white/80">
          <div className="flex flex-col w-full px-4 md:px-12 pt-4 pb-12 justify-between">

            {/* Navbar */}
            <div className="navbar p-0">
              <div className="flex-1">
                <a className="text-xl">{nickname[0]}</a>
              </div>
              <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                  <li><a>Link</a></li>
                  <li>
                    <details>
                      <summary>Parent</summary>
                      <ul className="bg-base-100 rounded-t-none p-2">
                        <li><a>Link 1</a></li>
                        <li><a>Link 2</a></li>
                      </ul>
                    </details>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Bio */}
            <div className="mt-12">
              <h1 className="text-6xl">{nickname}</h1>
              <h2 className="text-lg mt-4">{fullName}</h2>
              <p className="mt-8">{bio}</p>
              <div className="mt-8 gap-3">
                {skills.map((skill, i) => <div className="me-2 mb-2 badge badge-outline border border-gray-400 text-gray-600">{skill}</div>)}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </>
}

export default App
