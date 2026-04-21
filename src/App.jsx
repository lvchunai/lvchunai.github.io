import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  // 主题切换
  useEffect(() => {
    const saved = localStorage.getItem('darkMode')
    if (saved) {
      setDarkMode(saved === 'true')
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

  // 导航栏滚动效果
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 滚动动画 - Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            // 触发进度条动画
            const bars = entry.target.querySelectorAll('.skill-bar-fill')
            bars.forEach((bar) => {
              const width = bar.style.width
              bar.style.width = '0'
              setTimeout(() => {
                bar.style.width = width
              }, 100)
            })
          }
        })
      },
      { threshold: 0.2 }
    )

    document.querySelectorAll('.animate-section').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      const offset = 80
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  const toggleTheme = () => setDarkMode(!darkMode)

  return (
    <>
      {/* 导航栏 */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <a href="#" className="logo">
            <span className="logo-text">Z</span>
          </a>
          <ul className="nav-links">
            <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about') }}>关于</a></li>
            <li><a href="#skills" onClick={(e) => { e.preventDefault(); scrollToSection('skills') }}>能力</a></li>
            <li><a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects') }}>项目</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact') }}>联系</a></li>
          </ul>
          <div className="nav-actions">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="切换主题">
              {darkMode ? (
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5"/>
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                </svg>
              ) : (
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero 区域 */}
      <header className="hero">
        <div className="container">
          <div className={`hero-content animate-on-load`}>
            <p className="hero-greeting">你好，我是</p>
            <h1 className="hero-title">
              张三
              <span className="hero-title-accent">.</span>
            </h1>
            <p className="hero-subtitle">前端工程师 · 专注打造精致用户体验</p>
            <div className="hero-cta">
              <a href="#contact" className="btn btn-primary" onClick={(e) => { e.preventDefault(); scrollToSection('contact') }}>
                让我聊聊
              </a>
              <a href="#skills" className="btn btn-secondary" onClick={(e) => { e.preventDefault(); scrollToSection('skills') }}>
                查看能力
              </a>
              <a href="/resume.pdf" className="btn btn-outline" download>
                下载简历
              </a>
            </div>
          </div>
        </div>
        <div className="hero-gradient" />
      </header>

      {/* 关于我 */}
      <section id="about" className="section about">
        <div className="container">
          <div className="section-header animate-section">
            <span className="section-label">关于我</span>
          </div>
          <div className="about-content animate-section">
            <p className="about-text">
              一名对产品和设计都有感觉的前端工程师。相信好的代码应该像好的产品一样——
              表面简洁优雅，底层扎实可靠。擅长 React 技术栈，注重细节和性能优化，
              追求每个像素的精确呈现。
            </p>
          </div>
        </div>
      </section>

      {/* 核心能力 */}
      <section id="skills" className="section skills">
        <div className="container">
          <div className="section-header animate-section">
            <span className="section-label">核心能力</span>
          </div>
          <div className="skills-grid">
            <SkillCard
              icon="⚛️"
              title="React 开发"
              description="精通 React 及其生态，擅长构建复杂的单页应用和可复用组件库"
              delay={0}
            />
            <SkillCard
              icon="📘"
              title="TypeScript"
              description="类型驱动开发，编写可维护、健壮的代码，减少运行时错误"
              delay={100}
            />
            <SkillCard
              icon="🎨"
              title="UI/UX 实现"
              description="像素级还原设计，注重微交互和动画细节，打造流畅用户体验"
              delay={200}
            />
            <SkillCard
              icon="⚡"
              title="性能优化"
              description="深入理解浏览器渲染机制，擅长加载优化和运行时性能调优"
              delay={300}
            />
          </div>

          {/* 技能进度条 */}
          <div className="skills-detail animate-section">
            <div className="skill-bar">
              <div className="skill-bar-header">
                <span>React / Next.js</span>
                <span>90%</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" style={{ width: '90%' }} />
              </div>
            </div>
            <div className="skill-bar">
              <div className="skill-bar-header">
                <span>TypeScript</span>
                <span>85%</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" style={{ width: '85%' }} />
              </div>
            </div>
            <div className="skill-bar">
              <div className="skill-bar-header">
                <span>CSS / Tailwind</span>
                <span>88%</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" style={{ width: '88%' }} />
              </div>
            </div>
            <div className="skill-bar">
              <div className="skill-bar-header">
                <span>Node.js</span>
                <span>75%</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" style={{ width: '75%' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 项目展示 */}
      <section id="projects" className="section projects">
        <div className="container">
          <div className="section-header animate-section">
            <span className="section-label">精选项目</span>
          </div>
          <div className="projects-grid">
            <ProjectCard
              title="电商平台重构"
              description="主导前端架构重构，使用 React + TypeScript 替代原有 jQuery 代码，性能提升 60%"
              tags={['React', 'TypeScript', 'Vite']}
              color="#3B82F6"
            />
            <ProjectCard
              title="设计系统搭建"
              description="从 0 到 1 搭建组件库，包含 30+ 可复用组件，覆盖 90% 业务场景"
              tags={['Component Library', 'Storybook', 'CSS Modules']}
              color="#8B5CF6"
            />
            <ProjectCard
              title="数据可视化仪表盘"
              description="基于 D3 和 React 构建实时数据监控平台，支持自定义配置和告警"
              tags={['D3.js', 'React', 'WebSocket']}
              color="#EC4899"
            />
          </div>
        </div>
      </section>

      {/* 联系方式 */}
      <section id="contact" className="section contact">
        <div className="container">
          <div className="section-header animate-section">
            <span className="section-label">联系我</span>
          </div>
          <div className="contact-content animate-section">
            <p className="contact-text">
              如果有合适的工作机会或者想聊聊技术，<br />
              欢迎通过以下方式联系我：
            </p>
            <div className="contact-links">
              <a href="mailto:your.email@example.com" className="contact-card">
                <span className="contact-icon">📧</span>
                <span>发送邮件</span>
              </a>
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="contact-card">
                <span className="contact-icon">🐙</span>
                <span>GitHub</span>
              </a>
              <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="contact-card">
                <span className="contact-icon">💼</span>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="footer">
        <div className="container">
          <p className="footer-text">
            © 2026 张三 · Built with React + Vite
          </p>
        </div>
      </footer>
    </>
  )
}

function SkillCard({ icon, title, description, delay }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div className={`skill-card ${visible ? 'visible' : ''}`}>
      <div className="skill-icon">{icon}</div>
      <h3 className="skill-title">{title}</h3>
      <p className="skill-desc">{description}</p>
    </div>
  )
}

function ProjectCard({ title, description, tags, color }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`project-card ${visible ? 'visible' : ''}`} style={{ '--accent-color': color }}>
      <div className="project-header">
        <div className="project-dot" style={{ background: color }} />
        <h3 className="project-title">{title}</h3>
      </div>
      <p className="project-desc">{description}</p>
      <ul className="project-tags">
        {tags.map((tag) => (
          <li key={tag} className="tag">{tag}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
