
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { saveMessage } from "@/app/actions";
import { Loader2, Check, Send, User, Mail, MessageSquare } from "lucide-react";
import { AnimatedInput } from "@/components/animated-input";
import { Progress } from "@/components/ui/progress";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type FormValues = z.infer<typeof formSchema>;
type Step = "name" | "email" | "message" | "submitted";

const steps: Step[] = ["name", "email", "message"];

export function Contact() {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<Step>("name");
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const { trigger, getValues, formState, handleSubmit, reset } = form;

  const handleNext = async () => {
    const currentFieldIndex = steps.indexOf(currentStep);
    const currentField = steps[currentFieldIndex] as keyof FormValues;
    const isValid = await trigger(currentField);

    if (isValid && currentFieldIndex < steps.length - 1) {
      setCurrentStep(steps[currentFieldIndex + 1]);
    }
  };

  const onSubmit = async (values: FormValues) => {
    setFormStatus("submitting");
    try {
      await saveMessage(values);
      setFormStatus("success");
      setTimeout(() => {
        setCurrentStep("submitted");
      }, 500);
      setTimeout(() => {
        reset();
        setCurrentStep("name");
        setFormStatus("idle");
      }, 5000); 
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request. Please try again.",
      });
      setFormStatus("idle");
    }
  };
  
  const progress = (steps.indexOf(currentStep) + 1) / steps.length * 100;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
        {currentStep !== 'submitted' && (
             <Progress value={progress} className="absolute top-0 h-2 rounded-none" />
        )}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="mb-4">Get In Touch</h2>
          <p className="text-base md:text-lg text-foreground/80 mb-8">
            Have a project in mind or just want to say hello? I&apos;d love to hear from you.
          </p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-md mx-auto mt-8 bg-card/50 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden"
        >
          <AnimatePresence>
            {currentStep !== 'submitted' ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="p-6 sm:p-8">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <AnimatePresence mode="wait">
                      {steps.map((step, index) =>
                        currentStep === step && (
                          <motion.div
                            key={step}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 30 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                          >
                            {step === "name" && (
                              <AnimatedInput form={form} name="name" label="Name" Icon={User} onEnterPress={handleNext}/>
                            )}
                            {step === "email" && (
                              <AnimatedInput form={form} name="email" label="Email" Icon={Mail} onEnterPress={handleNext}/>
                            )}
                            {step === "message" && (
                              <AnimatedInput form={form} name="message" label="Message" Icon={MessageSquare} type="textarea"/>
                            )}
                          </motion.div>
                        )
                      )}
                    </AnimatePresence>

                    <div className="flex justify-end">
                      {currentStep === "message" ? (
                        <Button
                          type="submit"
                          size="lg"
                          disabled={formStatus === 'submitting'}
                          className="overflow-hidden relative"
                        >
                          <AnimatePresence mode="wait" initial={false}>
                            {formStatus === 'submitting' && (
                              <motion.div
                                key="submitting"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                className="flex items-center"
                              >
                                <Loader2 className="animate-spin mr-2"/> Sending...
                              </motion.div>
                            )}
                            {formStatus === 'success' && (
                              <motion.div
                                key="success"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                className="flex items-center"
                              >
                                <Check className="mr-2"/> Sent!
                              </motion.div>
                            )}
                            {formStatus === 'idle' && (
                              <motion.div
                                key="idle"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                className="flex items-center"
                              >
                                <Send className="mr-2"/> Send Message
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </Button>
                      ) : (
                        <Button type="button" size="lg" onClick={handleNext}>
                          Next
                        </Button>
                      )}
                    </div>
                  </form>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="submitted"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 p-6 sm:p-8"
              >
                <motion.div initial={{scale:0}} animate={{scale:1, transition:{delay:0.2, type:'spring'}}}>
                  <Check className="mx-auto h-16 w-16 rounded-full bg-primary/20 text-primary p-2" />
                </motion.div>
                <h3 className="mt-4 font-headline">Message Sent!</h3>
                <p className="text-muted-foreground mt-2">
                  Thank you for reaching out. I'll get back to you soon.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
