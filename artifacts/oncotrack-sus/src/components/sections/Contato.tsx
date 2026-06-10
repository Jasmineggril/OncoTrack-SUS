import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useState } from "react";

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export function Contato() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactForm>();

  const onSubmit = (data: ContactForm) => {
    console.log("Contact form submitted:", data);
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="contato" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-primary uppercase bg-primary/10 rounded-full border border-primary/20 mb-4"
          >
            Fale conosco
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Contato
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Quer saber mais sobre o OncoTrack SUS ou explorar uma parceria?
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-xl font-bold mb-6">Informações de Contato</h3>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium mb-0.5">E-mail</p>
                <a
                  href="mailto:jasminedesaraujo@gmail.com"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  data-testid="link-contact-email"
                >
                  jasminedesaraujo@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="font-medium mb-0.5">Localização</p>
                <p className="text-muted-foreground text-sm">Brasília, Distrito Federal — Brasil</p>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground leading-relaxed">
                O OncoTrack SUS está em fase de validação e busca parceiros institucionais, gestores do SUS e investidores que acreditam no poder da tecnologia para salvar vidas.
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-card border border-border rounded-xl p-6">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="w-14 h-14 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                    <Send className="h-6 w-6 text-secondary" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Mensagem enviada!</h4>
                  <p className="text-muted-foreground text-sm">Obrigada pelo seu contato. Retornaremos em breve.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Nome</label>
                    <Input
                      placeholder="Seu nome completo"
                      data-testid="input-contact-name"
                      {...register("name", { required: true })}
                      className={errors.name ? "border-destructive" : ""}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">E-mail</label>
                    <Input
                      type="email"
                      placeholder="seu@email.com"
                      data-testid="input-contact-email"
                      {...register("email", { required: true })}
                      className={errors.email ? "border-destructive" : ""}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Mensagem</label>
                    <Textarea
                      placeholder="Como podemos ajudar? Qual seu interesse no OncoTrack SUS?"
                      rows={4}
                      data-testid="input-contact-message"
                      {...register("message", { required: true })}
                      className={errors.message ? "border-destructive" : ""}
                    />
                  </div>
                  <Button type="submit" className="w-full gap-2" data-testid="button-contact-submit">
                    <Send className="h-4 w-4" />
                    Enviar mensagem
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
