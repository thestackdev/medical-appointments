"use client";

import { Button } from "@/components/ui/button";
import {
  Document,
  Page,
  Text,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import axios from "axios";
import { useEffect, useState } from "react";

type AppointmentProps = {
  id: string;
};

export default function PDF({ id }: AppointmentProps) {
  const [loading, setLoading] = useState(true);
  const [appointment, setAppointment] = useState(null);

  async function handleFetch() {
    try {
      if (!id) return;
      const response = await axios.get(`/api/appointments?id=${id}`);
      setAppointment(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleFetch();
  }, []);

  if (loading) return null;

  function PDFRender() {
    return (
      <Document>
        <Page style={styles.body}>
          <Text style={styles.title}>Prescription</Text>
          <Text style={styles.author}>
            {appointment.doctor.user.displayName}
          </Text>
          <Text style={styles.text}>{appointment.prescription}</Text>
        </Page>
      </Document>
    );
  }

  return (
    <PDFDownloadLink document={<PDFRender />} fileName="prescription.pdf">
      {({ blob, url, loading, error }) => (
        <Button
          loading={loading}
          disabled={loading || appointment.prescription === ""}
        >
          Download PDF
        </Button>
      )}
    </PDFDownloadLink>
  );
}

const styles = StyleSheet.create({
  body: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    maxWidth: 500,
    margin: "0 auto",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});
