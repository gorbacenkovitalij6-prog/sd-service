const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function migrateTheme(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            migrateTheme(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let original = content;

            // Global Text / BG Replacements
            // 1. We map specific transparencies of white to muted-foreground
            content = content.replace(/text-white\/[0-9]{2}/g, 'text-muted-foreground');
            
            // 2. We map "text-white" to "text-foreground" (except where it's part of another class)
            content = content.replace(/text-white(?![A-Za-z0-9\/-])/g, 'text-foreground');
            
            // 3. We map white-based borders to slate
            content = content.replace(/border-white\/([0-9]{1,2})/g, (match, p1) => {
                if(parseInt(p1) <= 10) return 'border-slate-200/60';
                return 'border-slate-300';
            });
            
            // 4. We map white backgrounds with transparency
            content = content.replace(/bg-white\/[0-9]{1,2}(?![A-Za-z0-9\/-])/g, 'bg-slate-50');
            
            // 5. We map black backgrounds with transparency (like form inputs in dark mode)
            content = content.replace(/bg-black\/[0-9]{1,2}(?![A-Za-z0-9\/-])/g, 'bg-white backdrop-blur-md');
            
            // 6. We map deep colors to light variants
            content = content.replace(/bg-\[#040b16\]/g, 'bg-slate-50');
            
            // Replace custom shadows
            content = content.replace(/shadow-\[0_0_[0-9]{1,2}px_rgba\(255,255,255,0\.[0-9]\)\]/g, 'shadow-sm');
            content = content.replace(/shadow-\[0_0_[0-9]{2}px_rgba\(59,130,246,0\.[0-9]\)\]/g, 'shadow-md');
            
            // Inputs
            content = content.replace(/placeholder:text-white\/30/g, 'placeholder:text-muted-foreground/50');
            
            // Text color corrections for elements that used to be white
            content = content.replace(/text-black/g, 'text-background'); 
            // e.g., <Button className="bg-white text-black" -> we now want it to use our brand colors instead of inverted.
            
            // Deep blue gradients mapped to amber/gold to match primary
            content = content.replace(/to-blue-[0-9]{3}/g, 'to-amber-500');
            content = content.replace(/from-blue-[0-9]{3}/g, 'from-amber-500');
            content = content.replace(/text-blue-[0-9]{3}/g, 'text-amber-500');
            content = content.replace(/bg-blue-[0-9]{3}/g, 'bg-amber-500');
            content = content.replace(/border-blue-[0-9]{3}/g, 'border-amber-500');
            content = content.replace(/via-blue-[0-9]{3} to-cyan-[0-9]{3}/g, 'to-amber-500');
            content = content.replace(/via-blue-400/g, 'via-amber-400');
            content = content.replace(/to-cyan-400/g, 'to-amber-600');

            // Replace "white" string that might be part of an inner text or class we missed (be careful)
            // It's safer to leave this to manual review.

            if (content !== original) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Updated', fullPath);
            }
        }
    }
}

migrateTheme(srcDir);
