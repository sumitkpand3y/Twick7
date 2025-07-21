'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { statsData } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function StatsCounter() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-800"
          >
            🚀 Our Achievements
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Numbers that showcase our commitment and expertise
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <StatItem key={stat.id} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({ stat, index }: { stat: typeof statsData[0], index: number }) {
  const [count, setCount] = useState(0);
  const duration = 2000;
  const delay = index * 0.15;

  useEffect(() => {
    let startTimestamp: number;
    const endValue = stat.value;
    
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentValue = Math.floor(progress * endValue);
      setCount(currentValue);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    const timer = setTimeout(() => {
      window.requestAnimationFrame(step);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [stat.value, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="h-full"
    >
      <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm group">
        <CardContent className="p-6 text-center flex flex-col items-center justify-center h-full">
          <div className="relative">
            <motion.p 
              className="text-4xl md:text-5xl font-bold text-primary mb-2"
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                type: 'spring', 
                stiffness: 200,
                delay: delay + 0.3
              }}
            >
              {stat.prefix}{count}{stat.suffix}
            </motion.p>
            <motion.div 
              className="absolute -bottom-1 left-0 right-0 h-1 bg-primary/20 rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: delay + 0.5 }}
            />
          </div>
          
          <motion.h3 
            className="text-xl font-semibold text-gray-800 mt-4 group-hover:text-primary transition-colors"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: delay + 0.7 }}
          >
            {stat.title}
          </motion.h3>
          
          <motion.p 
            className="text-gray-600 group-hover:text-gray-800 transition-colors"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: delay + 0.8 }}
          >
            {stat.subtitle}
          </motion.p>
          
          {index === 0 && (
            <motion.div 
              className="mt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: delay + 1 }}
            >
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                Trusted Since {new Date().getFullYear() - stat.value}
              </Badge>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}