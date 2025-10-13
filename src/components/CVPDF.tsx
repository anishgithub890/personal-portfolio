import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import portfolioContent from '@/lib/portfolio-content';
import type { JobExperience, Skill } from '@/types/portfolio-content';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 0,
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.2,
  },
  header: {
    background: 'linear-gradient(to right, rgba(37, 99, 235, 0.9), rgb(37, 99, 235))',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    marginLeft: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#ffffff',
  },
  title: {
    fontSize: 14,
    marginBottom: 4,
    color: '#ffffff',
  },
  description: {
    fontSize: 10,
    color: '#ffffff',
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  contactInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'rgba(245, 245, 245, 0.3)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    marginBottom: 4,
  },
  contactIcon: {
    width: 10,
    height: 10,
    marginRight: 6,
    color: '#6b7280',
  },
  contactText: {
    fontSize: 10,
    color: '#000000',
  },
  mainContent: {
    padding: 12,
  },
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    paddingBottom: 4,
    color: '#000000',
    borderBottomWidth: 2,
    borderBottomColor: '#2563eb',
    borderBottomStyle: 'solid',
  },
  summaryText: {
    fontSize: 10,
    color: '#6b7280',
    lineHeight: 1.5,
  },
  jobContainer: {
    marginBottom: 8,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  company: {
    fontSize: 10,
    color: '#2563eb',
    fontWeight: 'normal',
  },
  jobMeta: {
    fontSize: 8,
    color: '#6b7280',
    textAlign: 'right',
  },
  jobDescription: {
    fontSize: 8,
    color: '#6b7280',
    marginBottom: 4,
  },
  achievementsTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  achievementList: {
    marginBottom: 4,
  },
  achievementItem: {
    fontSize: 8,
    color: '#6b7280',
    marginBottom: 0,
    paddingLeft: 10,
  },
  techContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  techTag: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginRight: 4,
    marginBottom: 4,
    borderRadius: 2,
    fontSize: 7,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    color: '#000000',
  },
  educationContainer: {
    marginBottom: 4,
  },
  educationItem: {
    marginBottom: 4,
  },
  degree: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  institution: {
    fontSize: 10,
    color: '#2563eb',
    fontWeight: 'normal',
  },
  field: {
    fontSize: 8,
    color: '#6b7280',
  },
  skillsCategory: {
    marginBottom: 4,
  },
  skillsCategoryTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillTag: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginRight: 4,
    marginBottom: 4,
    borderRadius: 2,
    fontSize: 8,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    color: '#000000',
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestTag: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginRight: 4,
    marginBottom: 4,
    borderRadius: 2,
    fontSize: 8,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    color: '#000000',
  },
});

export default function CVPDF() {
  const content = portfolioContent;
  const { hero, about, experience, skills, footer } = content;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.name}>{hero.name}</Text>
            <Text style={styles.title}>{hero.title}</Text>
            <Text style={styles.description}>{hero.description}</Text>
          </View>
          <View style={styles.headerRight}>
            <Image
              style={styles.profileImage}
              src="/anish.jpg"
            />
          </View>
        </View>

        {/* Contact Information */}
        <View style={styles.contactInfo}>
          <View style={styles.contactItem}>
            <Text style={styles.contactText}>✉ {footer.contact.email}</Text>
          </View>
          <View style={styles.contactItem}>
            <Text style={styles.contactText}>☎ {footer.contact.whatsapp}</Text>
          </View>
          <View style={styles.contactItem}>
            <Text style={styles.contactText}>⚙ GitHub</Text>
          </View>
          <View style={styles.contactItem}>
            <Text style={styles.contactText}>💼 LinkedIn</Text>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Professional Summary */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.summaryText}>{about.personalInfo.whoIAm}</Text>
          </View>

          {/* Work Experience */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {experience.jobs.map((job: JobExperience, index: number) => (
              <View key={index} style={styles.jobContainer}>
                <View style={styles.jobHeader}>
                  <View>
                    <Text style={styles.jobTitle}>{job.position}</Text>
                    <Text style={styles.company}>{job.company}</Text>
                  </View>
                  <View style={styles.jobMeta}>
                    <Text>{job.location}</Text>
                    <Text>{job.startDate} - {job.endDate}</Text>
                  </View>
                </View>
                
                <Text style={styles.jobDescription}>{job.description}</Text>
                
                <Text style={styles.achievementsTitle}>Key Achievements:</Text>
                <View style={styles.achievementList}>
                  {job.achievements.map((achievement: string, idx: number) => (
                    <Text key={idx} style={styles.achievementItem}>• {achievement}</Text>
                  ))}
                </View>

                <View style={styles.techContainer}>
                  {job.technologies.map((tech: string, idx: number) => (
                    <Text key={idx} style={styles.techTag}>{tech}</Text>
                  ))}
                </View>
              </View>
            ))}
          </View>

          {/* Education */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            <View style={styles.educationContainer}>
              {about.education.map((edu: { degree: string; institution: string; field: string }, index: number) => (
                <View key={index} style={styles.educationItem}>
                  <Text style={styles.degree}>{edu.degree}</Text>
                  <Text style={styles.institution}>{edu.institution}</Text>
                  <Text style={styles.field}>{edu.field}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Technical Skills */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Technical Skills</Text>
            
            <View style={styles.skillsCategory}>
              <Text style={styles.skillsCategoryTitle}>Frontend Development</Text>
              <View style={styles.skillsContainer}>
                {skills.categories.frontend.map((skill: Skill, idx: number) => (
                  <Text key={idx} style={styles.skillTag}>{skill.name}</Text>
                ))}
              </View>
            </View>

            <View style={styles.skillsCategory}>
              <Text style={styles.skillsCategoryTitle}>Backend Development</Text>
              <View style={styles.skillsContainer}>
                {skills.categories.backend.map((skill: Skill, idx: number) => (
                  <Text key={idx} style={styles.skillTag}>{skill.name}</Text>
                ))}
              </View>
            </View>

            <View style={styles.skillsCategory}>
              <Text style={styles.skillsCategoryTitle}>Database & Tools</Text>
              <View style={styles.skillsContainer}>
                {skills.categories.database.map((skill: Skill, idx: number) => (
                  <Text key={idx} style={styles.skillTag}>{skill.name}</Text>
                ))}
              </View>
            </View>

            <View style={styles.skillsCategory}>
              <Text style={styles.skillsCategoryTitle}>Other Tools & Technologies</Text>
              <View style={styles.skillsContainer}>
                {skills.otherSkills.map((skill: string, idx: number) => (
                  <Text key={idx} style={styles.skillTag}>{skill}</Text>
                ))}
              </View>
            </View>
          </View>

          {/* Professional Interests */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Interests</Text>
            <View style={styles.interestsContainer}>
              {about.interests.map((interest: string, idx: number) => (
                <Text key={idx} style={styles.interestTag}>{interest}</Text>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
