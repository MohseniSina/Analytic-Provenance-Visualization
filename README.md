# Analytic-Provenance-Visualization

This is a visual analytic tool to visualize and explore analytic provenance data in text exploration scenarios. 
Analytic provenance visualization provides an overview of analysts' actions and insights during data analysis.
Our design aims to visually summarize analyst's interactions history and segment entire exploratory analytic task into short sub-tasks.


## Design

We present [**_ProvThreads_**](http://people.tamu.edu/~sina.mohseni/threads), a novel visual analytics tool that incorporates interactive topic modeling outcomes to illustrate relationships between user actions and analytic data.

<img src="http://people.tamu.edu/~sina.mohseni/webpage/threads.png" width=600px />

_ProvThreads_ projects a series of continuous analysis paths to demonstrate both topic coverage and the progression of an investigation over time.
We simplify high-dimension temporal event sequence data by combining data and user interaction records.
We first classify data provenance in multiple topics and each topic is represented with a color thread. 
As the analyst is interacting with different pieces of data during the analytic task, captured user actions form topic threads to emphasize user interest on topics at each time.
Next, analyst interacting with data topics results in height increase of same topic thread, and a decrease in other topic threads.
Topic threads shows how the analyst moves from one data topic to another, in what order the data was analyzed during the analytic task, and which data topics was more interesting to the analyst.
We use data topic changes as the basis of analytic provenance segmentation.
User action details are also available on this visualization tool.

## Use Case

Provenance Threads accommodates provenance recall and presentation with processing and visualizing analysis history.
This design also gives insight about analysis behavior and reasoning process by following analyst's focus and actions. 
We use _ProvThreads_ to segment analytic task and study analyst's strategy during the exploration.
We have studied and evaluated topic threads for analytic provenance segmentation and meta-analysis. 

More information in the [paper](http://people.tamu.edu/~sina.mohseni/papers/Provenance%20threads%20mohseni%20shortpaper.pdf).

We present qualitative and quantitative evaluations and discussion using provenance test data collected from user studies in the paper.

## Analytic Dataset

We have run sets of user studies to capture analytic provenance during text exploration tasks. 
We explain study procedure and how the text data is classified in topics. 

Details of the [analytic provenance dataset](http://people.tamu.edu/~sina.mohseni/papers/Dataset.pdf)

Download the dataset [here](https://research.arch.tamu.edu/analytic-provenance/datasets)

```
@article{mohseni2018analytic,
  title={Analytic Provenance Datasets: A Data Repository of Human Analysis Activity and Interaction Logs},
  author={Mohseni, Sina and Pachuilo, Andrew and Nirjhar, Ehsanul Haque and Linder, Rhema and Pena, Alyssa and Ragan, Eric D},
  journal={arXiv preprint arXiv:1801.05076},
  year={2018}
}
```

## Citation 
Details of the [ProvThreads](http://people.tamu.edu/~sina.mohseni/papers/Provenance%20threads%20mohseni%20shortpaper.pdf)

More on: https://research.arch.tamu.edu/analytic-provenance/

```
@article{mohseni2018provthreads,
  title={ProvThreads: Analytic Provenance Visualization and Segmentation},
  author={Mohseni, Sina and Pena, Alyssa and Ragan, Eric D},
  journal={arXiv preprint arXiv:1801.05469},
  year={2018}
}
```


