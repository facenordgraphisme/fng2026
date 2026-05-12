'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, Fragment, useRef } from 'react'
import { Menu, X, ChevronLeft, ChevronRight, ChevronDown, Moon, Sun, Home, Info, Briefcase, Image as ImageIcon, FileText, Mail, HelpCircle, Mountain } from 'lucide-react'
import { useTheme } from '@/components/ThemeProvider'
import Magnetic from '@/components/Magnetic'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

interface SidebarProps {
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function Sidebar({ isCollapsed = false, onToggleCollapse }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const navRef = useRef<HTMLDivElement>(null)
  
  useGSAP(() => {
    if (mounted) {
      gsap.fromTo('.nav-item-anim', 
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'elastic.out(1, 0.8)',
          delay: 0.2
        }
      );
    }
  }, { scope: navRef, dependencies: [mounted, isOpen] });

  useGSAP(() => {
    if (openMenu) {
      gsap.fromTo('.submenu-container', 
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.5, ease: 'power3.out' }
      );
      gsap.fromTo('.submenu-item',
        { x: -15, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out', delay: 0.1 }
      );
    }
  }, { dependencies: [openMenu], scope: navRef });

  const links = [
    { name: 'Accueil', path: '/', icon: <Home size={22} className="min-w-[22px]" /> },
    { name: 'A propos', path: '/a-propos', icon: <Info size={22} className="min-w-[22px]" /> },
    { 
      name: 'Prestations', 
      path: '/prestations', 
      icon: <Briefcase size={22} className="min-w-[22px]" />,
      sublinks: [
        { name: 'Site internet', path: '/creation-site-internet-hautes-alpes' },
        { name: 'E-Commerce', path: '/boutique-e-commerce-hautes-alpes' },
        { name: 'Refonte AI Friendly', path: '/refonte-ai-friendly' },
        { name: 'SEO', path: '/referencement-seo-hautes-alpes' },
        { name: 'Maintenance', path: '/maintenance-site-internet-hautes-alpes' },
      ]
    },
    { name: 'Portfolio', path: '/portfolio', icon: <ImageIcon size={22} className="min-w-[22px]" /> },
    { name: 'Blog', path: '/blog', icon: <FileText size={22} className="min-w-[22px]" /> },
    { name: 'FAQ', path: '/faq', icon: <HelpCircle size={22} className="min-w-[22px]" /> },
    { name: 'Contact', path: '/contact', icon: <Mail size={22} className="min-w-[22px]" /> },
  ]

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 w-full h-20 bg-white dark:bg-[#111111] z-50 flex items-center justify-between px-6 shadow-sm border-b border-gray-100 dark:border-white/10 transition-colors duration-300">
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link href="/">
            <div className="relative h-10 w-32">
               <Image src="/assets/logo.png" fill sizes="150px" className="object-contain dark:invert" alt="Logo Face Nord Graphisme - Création de site web Embrun" priority />
            </div>
          </Link>
        </div>
        <div className="flex-1" />
        <button onClick={() => setIsOpen(!isOpen)} className="text-[#1a1a1a] dark:text-white p-2 bg-gray-50 dark:bg-white/5 rounded-lg transition-colors z-10" data-magnetic="true">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Desktop Sidebar & Mobile Drawer */}
      <div className={`fixed inset-y-0 left-0 z-40 bg-white dark:bg-[#111111] shadow-[0_0_40px_rgba(0,0,0,0.03)] transform transition-all duration-300 ease-in-out flex flex-col border-r border-gray-100 dark:border-white/10
        ${isOpen ? 'translate-x-0 w-72' : '-translate-x-full md:translate-x-0'} 
        ${isCollapsed ? 'md:w-24' : 'md:w-72'}`}>
        
        {/* Toggle Collapse Button for Desktop */}
        {onToggleCollapse && (
          <div className="hidden md:flex absolute -right-4 top-8 z-50">
            <button 
              onClick={onToggleCollapse} 
              className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 text-[#666666] dark:text-[#a1a1aa] hover:text-[#239ea0] dark:hover:text-[#239ea0] rounded-full p-1.5 shadow-sm transition-colors"
            >
              {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          </div>
        )}

        <div className={`p-8 md:p-12 flex flex-col items-center ${isCollapsed ? 'md:px-4 md:pt-14' : ''}`}>
           <Link href="/">
            {isCollapsed ? (
                <div className="hidden md:flex relative w-16 h-12 items-center justify-center mx-auto transition-transform duration-300 hover:scale-105">
                   <Image src="/assets/logo.png" fill sizes="150px" className="object-contain dark:invert transition-all" alt="Logo Face Nord Graphisme - Agence web Hautes-Alpes" priority />
                </div>
            ) : (
              <div className="relative w-48 h-20 transition-transform duration-300 hover:scale-105">
                 <Image src="/assets/logo.png" fill sizes="150px" className="object-contain object-center dark:invert transition-all" alt="Logo Face Nord Graphisme" priority />
              </div>
            )}
            <div className={`md:hidden relative w-48 h-20 ${isCollapsed ? 'hidden' : 'block'}`}>
               <Image src="/assets/logo.png" fill sizes="150px" className="object-contain object-center dark:invert transition-all" alt="Logo Face Nord Graphisme" priority />
            </div>
          </Link>
        </div>

        <nav ref={navRef} className={`flex-grow flex flex-col justify-center gap-2 ${isCollapsed ? 'px-4' : 'px-8'} mt-10 md:mt-0 overflow-y-auto`}>
          {links.map((link) => {
            const isActive = pathname === link.path || (link.sublinks && link.sublinks.some(sub => pathname === sub.path));
            return (
              <Fragment key={link.path}>
                <div className="w-full nav-item-anim opacity-0">
                  <div className="relative w-full flex">
                    {/* Active Indicator Bar */}
                    {!isCollapsed && isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-[#239ea0] rounded-r-full z-10" />
                    )}
                    
                    <Link 
                      href={link.path}
                      onClick={() => { if (!link.sublinks) setIsOpen(false) }}
                      className={`group flex items-center gap-4 py-3.5 rounded-xl transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] capitalize w-full 
                        ${isCollapsed ? 'justify-center' : 'pl-8 pr-10'} 
                        ${isActive 
                          ? (isCollapsed ? 'bg-[#239ea0] text-white shadow-lg' : 'text-[#239ea0] font-black bg-[#239ea0]/10') 
                          : (isCollapsed ? 'text-[#666666] dark:text-[#a1a1aa] hover:bg-gray-100 dark:hover:bg-white/10' : 'text-[#666666] dark:text-[#a1a1aa] font-medium hover:text-[#239ea0] hover:bg-[#239ea0]/5 hover:translate-x-2')
                        }
                      `}
                      title={isCollapsed ? link.name : undefined}
                    >
                      <div className={`transition-all duration-300 group-hover:scale-125 ${isCollapsed && isActive ? 'text-white' : (isActive ? 'text-[#239ea0]' : 'text-gray-400 group-hover:text-[#239ea0]')}`}>
                        {link.icon}
                      </div>
                      {!isCollapsed && <span className="whitespace-nowrap tracking-wider">{link.name}</span>}
                    </Link>
                    {link.sublinks && !isCollapsed && (
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          setOpenMenu(openMenu === link.name ? null : link.name);
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 z-10"
                        aria-label="Toggle submenu"
                      >
                        <ChevronDown size={18} className={`transition-transform duration-300 ${openMenu === link.name ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>
                </div>
                {link.sublinks && openMenu === link.name && !isCollapsed && (
                  <div className="submenu-container overflow-hidden">
                    <div className="flex flex-col gap-1 mt-1 ml-14 border-l-2 border-[#239ea0]/20 pl-4 py-2">
                      {link.sublinks.map((sub, i) => (
                        <Link
                          key={i}
                          href={sub.path}
                          onClick={() => setIsOpen(false)}
                          className={`submenu-item py-2.5 text-[13px] font-bold transition-all hover:pl-2 hover:text-[#239ea0] ${
                            pathname === sub.path 
                              ? 'text-[#239ea0]' 
                              : 'text-[#666666] dark:text-[#a1a1aa]'
                          }`}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </Fragment>
            );
          })}
        </nav>

        <div className={`p-8 flex flex-col gap-6 text-[#666666] dark:text-[#a1a1aa] ${isCollapsed ? 'items-center px-4' : ''}`}>
          {/* Theme Toggle */}
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group ${isCollapsed ? 'justify-center w-full h-12' : 'w-full'}`}
            title={isCollapsed ? "Changer le thème" : undefined}
          >
            <div className="transition-transform duration-300 group-hover:rotate-12">
              {mounted ? (theme === 'dark' ? <Moon size={22} className="min-w-[22px]" /> : <Sun size={22} className="min-w-[22px]" />) : <div className="w-[22px] h-[22px]" />}
            </div>
            {!isCollapsed && <span className="font-medium text-[15px] whitespace-nowrap">{mounted ? (theme === 'dark' ? 'Mode Sombre' : 'Mode Clair') : 'Thème'}</span>}
          </button>

          {/* Socials */}
          <div className={`flex gap-4 ${isCollapsed ? 'flex-col items-center' : ''}`}>
            <a href="#" className="flex hover:text-[#239ea0] dark:hover:text-white transition-all p-2 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg hover:-translate-y-1" aria-label="Facebook">
              <svg className="w-5 h-5 pointer-events-none" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
            </a>
            <a href="#" className="flex hover:text-[#239ea0] dark:hover:text-white transition-all p-2 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg hover:-translate-y-1" aria-label="Instagram">
              <svg className="w-5 h-5 pointer-events-none" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
            </a>
          </div>
        </div>
      </div>
      
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-30" onClick={() => setIsOpen(false)} />
      )}
    </>
  )
}
