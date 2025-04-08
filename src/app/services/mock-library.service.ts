import { Injectable } from '@angular/core';

export interface MockComponent {
  id: string;
  name: string;
  description: string;
  previewCode: string;
  category: string;
  icon: string;
}

@Injectable({
  providedIn: 'root'
})
export class MockLibraryService {
  private mockComponents: MockComponent[] = [
    {
      id: 'header',
      name: 'Page Header',
      description: 'A responsive page header with navigation menu',
      previewCode: `<header style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 1rem; color: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center;">
          <h1 style="margin: 0; font-size: 1.5rem; font-weight: 500;">Brand Logo</h1>
          <nav style="display: flex; gap: 1.5rem;">
            <a href="#" style="color: white; text-decoration: none; font-weight: 500; transition: opacity 0.3s ease;">Home</a>
            <a href="#" style="color: white; text-decoration: none; font-weight: 500; transition: opacity 0.3s ease;">About</a>
            <a href="#" style="color: white; text-decoration: none; font-weight: 500; transition: opacity 0.3s ease;">Services</a>
            <a href="#" style="color: white; text-decoration: none; font-weight: 500; transition: opacity 0.3s ease;">Contact</a>
          </nav>
        </div>
      </header>`,
      category: 'Layout',
      icon: 'web_asset'
    },
    {
      id: 'footer',
      name: 'Page Footer',
      description: 'A responsive footer with multiple columns',
      previewCode: `<footer style="background: #1a1a1a; color: white; padding: 4rem 2rem;">
        <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem;">
          <div>
            <h3 style="margin-bottom: 1rem; color: #fff; font-weight: 500;">About Us</h3>
            <p style="color: #999; line-height: 1.6;">We're dedicated to creating the best possible experience for our users.</p>
          </div>
          <div>
            <h3 style="margin-bottom: 1rem; color: #fff; font-weight: 500;">Quick Links</h3>
            <ul style="list-style: none; padding: 0; margin: 0;">
              <li style="margin-bottom: 0.5rem;"><a href="#" style="color: #999; text-decoration: none; transition: color 0.3s ease;">Home</a></li>
              <li style="margin-bottom: 0.5rem;"><a href="#" style="color: #999; text-decoration: none; transition: color 0.3s ease;">About</a></li>
              <li style="margin-bottom: 0.5rem;"><a href="#" style="color: #999; text-decoration: none; transition: color 0.3s ease;">Services</a></li>
              <li style="margin-bottom: 0.5rem;"><a href="#" style="color: #999; text-decoration: none; transition: color 0.3s ease;">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 style="margin-bottom: 1rem; color: #fff; font-weight: 500;">Contact Us</h3>
            <p style="color: #999; margin-bottom: 0.5rem;">Email: info@example.com</p>
            <p style="color: #999; margin-bottom: 0.5rem;">Phone: (123) 456-7890</p>
            <p style="color: #999;">Address: 123 Main St, City, Country</p>
          </div>
        </div>
        <div style="max-width: 1200px; margin: 2rem auto 0; padding-top: 2rem; border-top: 1px solid #333; text-align: center; color: #666;">
          <p>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
      </footer>`,
      category: 'Layout',
      icon: 'horizontal_split'
    },
    {
      id: 'content-section',
      name: 'Content Section',
      description: 'A flexible content section with title and customizable content',
      previewCode: `<section style="padding: 4rem 2rem; background: #f5f5f5;">
        <div style="max-width: 1200px; margin: 0 auto;">
          <h2 style="text-align: center; margin-bottom: 3rem; color: #333; font-size: 2.5rem;">Section Title</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
            <div style="background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: transform 0.3s ease;">
              <div style="color: #2196F3; font-size: 2rem; margin-bottom: 1rem;">⚡</div>
              <h3 style="margin-bottom: 1rem; color: #333; font-size: 1.5rem;">Feature One</h3>
              <p style="color: #666; line-height: 1.6;">Experience blazing fast performance with our optimized platform. Built for speed and efficiency.</p>
            </div>
            <div style="background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: transform 0.3s ease;">
              <div style="color: #2196F3; font-size: 2rem; margin-bottom: 1rem;">🎨</div>
              <h3 style="margin-bottom: 1rem; color: #333; font-size: 1.5rem;">Feature Two</h3>
              <p style="color: #666; line-height: 1.6;">Create stunning interfaces with our modern design system. Beautiful and functional.</p>
            </div>
          </div>
        </div>
      </section>`,
      category: 'Layout',
      icon: 'dashboard'
    },
    {
      id: 'button-primary',
      name: 'Primary Button',
      description: 'A material design primary button with raised styling',
      previewCode: `<button style="background: linear-gradient(45deg, #2196F3 30%, #21CBF3 90%); color: white; border: none; padding: 0.75rem 2rem; border-radius: 25px; font-weight: 500; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 3px 5px 2px rgba(33, 203, 243, .3);">
        Get Started
      </button>`,
      category: 'Buttons',
      icon: 'smart_button'
    },
    {
      id: 'card-basic',
      name: 'Basic Card',
      description: 'A material design card component with title and content areas',
      previewCode: `<div style="background: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden; transition: transform 0.3s ease, box-shadow 0.3s ease;">
        <div style="padding: 1.5rem;">
          <h3 style="margin: 0 0 0.5rem; color: #333; font-size: 1.5rem;">Card Title</h3>
          <p style="margin: 0 0 1rem; color: #666;">Card Subtitle</p>
          <p style="color: #444; line-height: 1.6;">This is a beautifully designed card component with smooth transitions and modern styling. Perfect for displaying content in an elegant way.</p>
        </div>
        <div style="padding: 1rem; background: #f5f5f5; border-top: 1px solid #eee;">
          <button style="background: transparent; color: #2196F3; border: none; padding: 0.5rem 1rem; font-weight: 500; cursor: pointer; transition: color 0.3s ease;">LEARN MORE</button>
        </div>
      </div>`,
      category: 'Layout',
      icon: 'crop_square'
    }
  ];

  getComponents(): MockComponent[] {
    return this.mockComponents;
  }

  getComponentById(id: string): MockComponent | undefined {
    return this.mockComponents.find(comp => comp.id === id);
  }
}