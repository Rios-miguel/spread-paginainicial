"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  baseRadius: number;
  isHub: boolean;
  energy: number;
};

/**
 * Efeito interativo de malha de grafos em Canvas (laranja e branco).
 * Ao passar o mouse pelo fundo escuro, os nós e as conexões se iluminam e se expandem
 * brevemente com brilho de rede on-chain, decaindo suavemente conforme o cursor se afasta.
 */
export function InteractiveNetworkGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let nodes: Node[] = [];

    const mouse = {
      x: -9999,
      y: -9999,
      active: false,
      radius: 170, // raio de influência do cursor
    };

    // Respeita preferência do sistema por movimento reduzido
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      initNodes();
    };

    const initNodes = () => {
      nodes = [];
      // Quantidade calibrada pela área: ~65 nós em desktop, ~35 em mobile
      const density = width > 768 ? 14000 : 20000;
      const count = Math.max(30, Math.min(95, Math.floor((width * height) / density)));

      for (let i = 0; i < count; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const isHub = Math.random() < 0.2; // 20% são nós maiores (estrelas/hubs)
        nodes.push({
          x,
          y,
          originX: x,
          originY: y,
          vx: (Math.random() - 0.5) * (prefersReducedMotion ? 0 : 0.4),
          vy: (Math.random() - 0.5) * (prefersReducedMotion ? 0 : 0.4),
          baseRadius: isHub ? 2.8 : 1.8,
          isHub,
          energy: 0,
        });
      }
    };

    // Eventos do mouse no container (ou janela para transições fluidas)
    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;

      // Dispara energia nos nós próximos
      for (const n of nodes) {
        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius);
          n.energy = Math.max(n.energy, Math.min(1, force * 1.4));
          // Leve expansão física do nó para fora do cursor
          if (!prefersReducedMotion && dist > 5) {
            n.x += (dx / dist) * force * 1.5;
            n.y += (dy / dist) * force * 1.5;
          }
        }
      }
    };

    const onPointerLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("mouseleave", onPointerLeave);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    // Loop de renderização
    const maxDist = 125; // distância máxima de conexão entre nós vizinhos

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Atualiza posição e decaimento de energia de cada nó
      for (const n of nodes) {
        if (!prefersReducedMotion) {
          n.x += n.vx;
          n.y += n.vy;

          // Retorna suavemente para a posição de origem se foi deslocado
          n.x += (n.originX - n.x) * 0.02;
          n.y += (n.originY - n.y) * 0.02;

          // Rebater nas bordas com amortecimento
          if (n.x < 10) { n.x = 10; n.vx *= -1; }
          if (n.x > width - 10) { n.x = width - 10; n.vx *= -1; }
          if (n.y < 10) { n.y = 10; n.vy *= -1; }
          if (n.y > height - 10) { n.y = height - 10; n.vy *= -1; }
        }

        // Decaimento suave da energia (cria o rastro de expansão temporária)
        n.energy *= 0.945;
        if (n.energy < 0.005) n.energy = 0;
      }

      // 1. Desenha as arestas/conexões (triangulação e links)
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const distRatio = 1 - dist / maxDist;
            const jointEnergy = Math.max(a.energy, b.energy);

            // Opacidade base (sutil) + bônus brilhante quando energizado pelo mouse
            const alpha = 0.035 * distRatio + jointEnergy * 0.55 * distRatio;

            if (alpha > 0.02) {
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);

              if (jointEnergy > 0.15) {
                // Linha energizada: gradiente brilhante Laranja Spread -> Branco
                const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
                grad.addColorStop(0, `rgba(242, 106, 27, ${Math.min(1, alpha * 1.2)})`);
                grad.addColorStop(0.5, `rgba(255, 255, 255, ${Math.min(1, alpha * 1.5)})`);
                grad.addColorStop(1, `rgba(242, 106, 27, ${Math.min(1, alpha * 1.2)})`);
                ctx.strokeStyle = grad;
                ctx.lineWidth = 1 + jointEnergy * 1.4;
              } else {
                // Linha de fundo em repouso: cinza/branco translúcido
                ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
                ctx.lineWidth = 0.8;
              }
              ctx.stroke();
            }
          }
        }

        // Conexão sutil dos nós mais próximos ao próprio cursor do mouse
        if (mouse.active && a.energy > 0.25) {
          const dx = mouse.x - a.x;
          const dy = mouse.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const alpha = (1 - dist / mouse.radius) * a.energy * 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(242, 106, 27, ${alpha})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }

      // 2. Desenha os nós (pontos e estrelas com halo)
      for (const n of nodes) {
        const radius = n.baseRadius + n.energy * (n.isHub ? 4.5 : 3.0);

        // Se o nó estiver energizado, desenha o halo de expansão brilhante (tipo a imagem de exemplo)
        if (n.energy > 0.08) {
          const glowRadius = radius * (n.isHub ? 4.5 : 3.5);
          const halo = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowRadius);

          if (n.isHub) {
            halo.addColorStop(0, `rgba(255, 255, 255, ${Math.min(1, n.energy * 0.95)})`);
            halo.addColorStop(0.25, `rgba(255, 196, 155, ${Math.min(1, n.energy * 0.75)})`);
            halo.addColorStop(0.6, `rgba(242, 106, 27, ${Math.min(1, n.energy * 0.45)})`);
            halo.addColorStop(1, "rgba(242, 106, 27, 0)");
          } else {
            halo.addColorStop(0, `rgba(255, 255, 255, ${Math.min(1, n.energy * 0.8)})`);
            halo.addColorStop(0.5, `rgba(242, 106, 27, ${Math.min(1, n.energy * 0.5)})`);
            halo.addColorStop(1, "rgba(242, 106, 27, 0)");
          }

          ctx.beginPath();
          ctx.arc(n.x, n.y, glowRadius, 0, Math.PI * 2);
          ctx.fillStyle = halo;
          ctx.fill();
        }

        // Núcleo do nó (ponto branco central com borda laranja)
        ctx.beginPath();
        ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);

        if (n.energy > 0.2) {
          ctx.fillStyle = "#ffffff";
          ctx.shadowColor = "#f26a1b";
          ctx.shadowBlur = 10 * n.energy;
        } else {
          ctx.fillStyle = n.isHub ? "rgba(255, 255, 255, 0.45)" : "rgba(255, 255, 255, 0.25)";
          ctx.shadowColor = "transparent";
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("mouseleave", onPointerLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-15 overflow-hidden [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_85%)]"
    >
      <canvas ref={canvasRef} className="block size-full" />
    </div>
  );
}
